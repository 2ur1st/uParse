/**
 *
 * @type {Object}
 */

function Fabrica() {

    this.init = function(url) {
        if(GrabCategories.isset()) {
            return GrabCategories;
        }

        console.log(GrabProducts._currentUrl);
        if(GrabProducts.isset()) {
            return GrabProducts;
        }

        throw new Error('This page not have product and categories product');
    };

}



exports.create = function() {
    return new Fabrica();
};