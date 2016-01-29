/**
 *
 *  this file extends object Grap for custom website
 *
 */
var file = require("./file").create();
var logger = require("./logger").create();
var config = require("./config").getConfig();
var paginator = require("./paginator").create();

var Grab = require("./grab").init();

/**
 * tag by which should identify category page
 */
Grab.prototype.TAG_CAT_PAGE = 'div.category';

/**
 * tag by which should identify product page
 */
Grab.prototype.TAG_PROD_PAGE = 'div.product';

Grab.prototype._sleep = false;

Grab.prototype._categories = [];

/**
 * init require function route
 */
Grab.prototype.route = function() {
    try {
        if(this.isCategoryPage()) {
            logger.add('get categories');
            this._categories = this.getCategories();
            setInterval(function() {
                Grab.prototype.scheduler();
            }, 1000);
        }

        if(!this.isCategoryPage()) {
            logger.add('get page product');
            this.getProducts();
        }
        //this.close();
    } catch(err) {
        logger.add(err);
        this.exit();
    }
};

/**
 * TODO it is not work !!!
 */
Grab.prototype.scheduler = function() {
    console.log(!!this._sleep);
    if(!this._categories.length && this._sleep) {
        return;
    }
    var category = this._categories.shift();
    Grab.sleep(true);
    logger.add('Open page category ' + category.name);
    Grab.open(category.url);
};

Grab.prototype.initCustomEvent = function() {
    paginator.init(this);
    logger.init(config.debug);
};

/**
 *
 * @returns {*}
 */
Grab.prototype.getCategories = function() {
    var categories = this._page.evaluate(function(tag) {
        var categories = [];
        jQuery(tag).each(function(key, value) {
            var $category = jQuery(value);
            var category = {
                'type': 'category',
                'name': $category.find('h2 > a').text().trim().toLowerCase(),
                'url': $category.find('h2 > a').attr('href')
            };
            categories.push(category);
        });
        return categories;
    }, this.TAG_CAT_PAGE);

    if(categories.length) {
        file.stringify(config.result_file, categories, 'a');
    }
    return categories;
};

/**
 * check is a categories page
 * @returns bool
 */
Grab.prototype.isCategoryPage = function() {
    return this._page.evaluate(function(tag) {
        return !!jQuery(tag).length;
    }, this.TAG_CAT_PAGE);
};

Grab.prototype.sleep = function(status) {
    this._sleep = !!status;
};

/**
 *
 */
Grab.prototype.getProducts = function() {
    var products = this.getProduct();
    if(products.length) {
        file.stringify(config.result_file, products, 'a');
    }
    if(paginator.exist() && paginator.nextPageExist()) {
        logger.add('Next page');
        paginator.nextPage();
    } else {
        this.sleep(false);
        logger.add(this._sleep);
    }

};

/**
 * function for getting all product from page
 * @returns {Object}
 */
Grab.prototype.getProduct = function() {
    return this._page.evaluate(function(tag) {
        var products = [];
        jQuery(tag).each(function(key, value) {
            var $product = jQuery(value); //.find('a.name');
            var product = {
                'type': 'product',
                'name': $product.find('h2 > a').text().trim().toLowerCase(),
                'url': $product.find('h2 > a').attr('href')
            };
            products.push(product);
        });
        return products;
    }, this.TAG_PROD_PAGE);
};


/**
 * export function
 */
exports.create = function() {
    return new Grab();
};