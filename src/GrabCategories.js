/**
 *
 * @constructor
 */
var Grab = require("./grab").create();

function GrabCategories() {
    /**
     * tag by which should identify category page
     */
    this.TAG_CAT_PAGE = 'div.category';

    /**
     * check is a categories page
     * @returns {*}
     */
    this.isset = function() {
        return this._page.evaluate(function(tag) {
            return !!jQuery(tag).length;
        }, this.TAG_CAT_PAGE);
    };

    /**
     * get categories from page
     * @returns {*}
     */
    this._get = function() {
        var categories = this._page.evaluate(function(tag) {
            var categories = [];
            jQuery(tag).each(function(key, value) {
                var $category = jQuery(value);
                var category = {
                    'id': Math.floor((Math.random() * 10000) + 1),
                    'type': 'category',
                    'name': $category.find('h2 > a').text().trim().toLowerCase(),
                    'url': $category.find('h2 > a').attr('href')
                };
                categories.push(category);
            });
            return categories;
        }, this.TAG_CAT_PAGE);

        //if(categories.length) {
        //    file.stringify(config.result_file, categories, 'a');
        //}
        console.log(categories.length);
        categories.forEach(function(key, value) {
           console.log(key);
            console.log(value);
        });
        //return categories;

    };

    /**
     * init require function route
     */
    this.route = function() {
        try {
            if(!this.isset()) {
                return false;
            }
            console.log('get categories');
            return this._get();

        } catch(err) {
            console.log(err);
            this.exit();
        }
    }
}

GrabCategories.prototype = Grab;

/**
 * export function
 */
exports.create = function() {
    return new GrabCategories();
};