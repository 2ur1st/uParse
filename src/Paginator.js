/**
 *
 * Object for effective working with the pagintaion
 *
 */
function Paginator() {

    /**
     * @type {string} DOM element contain pagination button
     */
    this.TAG_PAGINATION = '.pagination';

    /**
     * @type {string} DOM link or button for click on the next page
     */
    this.TAG_PAGINATION_NEXT = '.pagination .pagination-next a';

    /**
     * Object Grab for working on the actuall page
     * @private
     */
    this._grab = null;

    /**
     * init object
     * @param grab {object} Grab Object
     */
    this.init = function(grab) {
        this._grab = grab;
    };

    /**
     * check exist pagination on the page
     * @returns {Object}
     */
    this.exist = function() {
        return this._grab.evaluate(function(tag) {
            return !!jQuery(tag).length;
        }, this.TAG_PAGINATION);
    };

    /**
     * check exist pagination on the page
     * @returns {Object}
     */
    this.nextPageExist = function() {
        return this._grab.evaluate(function(tag) {
            return !!jQuery(tag).length;
        }, this.TAG_PAGINATION_NEXT);
    };

    /**
     * open next page
     * @returns {Object}
     */
    this.nextPage = function() {
        var url = this._grab.evaluate(function(tag) {
            return jQuery(tag).attr('href');
        }, this.TAG_PAGINATION_NEXT);

        if(!url) {
            throw new Error('URL not found ('+url+')');
        }
        this._grab.open(url);
    };

}

exports.create = function() {
    return new Paginator();
};