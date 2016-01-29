/**
 *
 *
 */
function Paginator() {

    this.TAG_PAGINATION = '.pagination';

    this.TAG_PAGINATION_NEXT = '.pagination .pagination-next a';

    this._grab = null;

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
            if(!jQuery(tag).length) {
                console.log('It is last page in this categories');
                return false;
            }
            return jQuery(tag).attr('href');
        }, this.TAG_PAGINATION_NEXT);

        if(url) {
            this._grab.open(url);
        }
    };

}

exports.create = function() {
    return new Paginator();
};