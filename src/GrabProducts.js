/**
 *
 *  this file extends object Grap for custom website
 *
 */
var Grab = require("./Grab").create();
var Paginator = require("./Paginator").create();
var Config = require("./Config").create();
var File = require("./File").create();

function GrabProducts() {
    /**
     * tag by which should identify product page
     */
    this.TAG_PROD_PAGE = 'div.product';

    /**
     * check is a products page
     * @returns {*}
     */
    this.isset = function() {
        return this._page.evaluate(function(tag) {
            return !!jQuery(tag).length;
        }, this.TAG_PROD_PAGE);
    };

    /**
     *
     */
    this.getProducts = function() {
        var products = this.getProduct();
        if(products.length) {
            File.stringify(Config.get('resultFile'), products, 'a');
        }
        if(Paginator.exist() && Paginator.nextPageExist()) {
            Paginator.nextPage();
        }
    };

    /**
     * function for getting all product from page
     * @returns {Object}
     */
    this.getProduct = function() {
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
     * init require function route
     */
    this.route = function() {
        try {
            if(!this.isset()) {
                return false;
            }
            console.log('get products');
            return this.getProducts();

        } catch(err) {
            console.log(err);
            this.exit();
        }
    };

    this.initUtils = function() {
        Paginator.init(this);
        //logger.init(config.debug);
    };

}

GrabProducts.prototype = Grab;


/**
 * export function
 */
exports.create = function() {
    return new GrabProducts();
};