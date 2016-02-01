/**
 *
 * CONFIGURE FILE
 *
 */

var Singleton;
(function() {

    var instance;

    Singleton = function() {
        if(instance) {
            return instance;
        }
        instance = this;
    };

    Singleton.prototype._urls = [];

    Singleton.prototype.push = function(url) {
        this._urls.push(url);
    };

    Singleton.prototype.pop = function() {
        this._urls.pop();
    };

    Singleton.prototype.host = 'http://wolta.ru/';

    /**
     * options for slimerJs objetc
     * @type {{viewportSize: {width: number, height: number}}}
     */
    Singleton.prototype.slimer = {
        viewportSize: {width: 480, height: 800}
    };

    /**
     * @type {string} path to log file
     */
    Singleton.prototype.logPath = 'logs\\error.txt';

    /**
     * @type {string} path to result file
     */
    Singleton.prototype.resultFile = 'result\\result.txt';

    /**
     * @type {boolean} key for debug
     */
    Singleton.prototype.debug = true;

    /**
     * set param
     * @param key
     * @param value
     */
    Singleton.prototype.set = function(key, value) {
        this[key] = value;
    };

    /**
     * get param
     * @param key
     * @returns {*}
     */
    Singleton.prototype.get = function(key) {
        return this[key];
    };

})();

exports.create = function() {
    return new Singleton();
};
