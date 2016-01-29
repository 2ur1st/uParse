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

Grab.prototype.products = [];

/**
 * init require function route
 */
Grab.prototype.route = function() {
    logger.add('-- Run Route --');
    try {
        if(this.isCategoryPage()) {
            logger.add('get categories');
            var categories = this.getCategories();
            //file.writeJson(config.result_file, categories, 'a');
            for (var i = 0; i < categories.length; i++) {
                var url = categories[i].url_article;
                new Grab().init(url, categories[i].title);
                slimer.wait(3000);
            }
        }

        this.getProducts();
        //this.close();
    } catch(err) {
        logger.add(err);
        this.exit();
    }
};

Grab.prototype.initCustomEvent = function() {
    paginator.init(this);
    logger.init(config.debug);
};

//Grab.prototype.getCategories = function() {
//    return this.getContent('categories')
//};
//
/**
 * check is a categories page
 * @returns bool
 */
Grab.prototype.isCategoryPage = function() {
    return this._page.evaluate(function(tag) {
        return jQuery(tag).length;
    }, this.TAG_CAT_PAGE);
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
    }
    //_paginator.nextPage();

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