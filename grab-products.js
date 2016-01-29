/**
 *
 *  this file extends object Grap for custom website
 *
 */
var file = require("./file").create();
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


Grab.prototype.sleep = false;

/**
 * init require function route
 */
Grab.prototype.route = function() {
    console.log('Run route function');
    try {

        if(this.sleep) {
            return false;
        }

        if(this.isCategoryPage()) {
            console.log('get categories');
            var categories = this.getCategories();
            //file.writeJson(config.result_file, categories, 'a');
            for (var i = 0; i < categories.length; i++) {
                var url = categories[i].url_article;
                new Grab().init(url, categories[i].title);
                slimer.wait(3000);
            }
        }

        var content = this.getProducts();
        file.stringify(config.result_file, content, 'a');
        this.close();
        //
        //this.close();
    } catch(err) {
        console.log(err);
        this.close();
    }
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
    this.sleep = true;
    paginator.init(this);

    var products = this.getProduct();
    if(!paginator.exist()) {
        return products;
    }

    while(paginator.nextPageExist()) {
        slimer.wait(2000);
        console.log(' --- next page --- ');
        //paginator.nextPage();
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
                'name': $product.find('h2 > a').text().trim().toLowerCase(),
                'url': $product.find('h2 > a').attr('href')
                //'image': jQuery(value).find('a.img > img').attr('src')
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