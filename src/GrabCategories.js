
var Grab = require("./grab").init();

function GrabCategories() {
    /**
     * tag by which should identify category page
     */
    this.TAG_CAT_PAGE = 'div.category';
}

/**
 * check is a categories page
 * @returns bool
 */
GrabCategories.prototype.isCategoryPage = function() {
    return this._page.evaluate(function(tag) {
        return !!jQuery(tag).length;
    }, this.TAG_CAT_PAGE);
};

/**
 *
 * @returns {*}
 */
GrabCategories.prototype.getCategories = function() {
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

GrabCategories.prototype.__proto__ = Grab.prototype;

/**
 * export function
 */
exports.create = function() {
    return new GrabCategories();
};