/**
 *
 *  this file extends object Grap for custom website
 *
 */
var Grab = require("./grab").init();

function GrabProducts() {
    /**
     * tag by which should identify product page
     */
   this.TAG_PROD_PAGE = 'div.product';
}

/**
 *
 */
GrabProducts.prototype.getProducts = function() {
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
GrabProducts.prototype.getProduct = function() {
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

GrabProducts.prototype.__proto__ = Grab.prototype;





Grab.prototype.initCustomEvent = function() {
    paginator.init(this);
    logger.init(config.debug);
};

Grab.prototype.sleep = function(status) {
    this._sleep = !!status;
};




/**
 * export function
 */
exports.create = function() {
    return new Grab();
};