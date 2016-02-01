/**
 *
 * Main class for Parsing data
 *
 */
var Config = require("./Config").create();

function Grab() {

    this.name = null;

    /**
     * variable for safe webpage object
     */
    this._page = null;

    /**
     * @type string current URL
     */
    this._currentUrl = null;

    /**
     * init object
     */
    this.init = function() {
        this._page = require("webpage").create();
        this.initCallbacks();
        if (typeof this.initUtils === 'function') {
            this.initUtils();
        }
        return this;
    };

    /**
     * open url
     * @param url
     */
    this.open = function(url) {
        if(!url.match(/^http/i)) {
            url = Config.get('host') + url;
        }
        this._page.open(url);
    };

    /**
     * close webpage object
     */
    this.close = function() {
        console.log('-- Close page --');
        this._page.close();

    };

    /**
     * close programm
     */
    this.exit = function() {
        phantom.exit();
    };

    /**
     * evalute code in webpage
     */
    this.evaluate = function(func, param) {
        if(typeof param !== 'undefined') {
            return this._page.evaluate(func, param);
        }
        return this._page.evaluate(func);
    };

    /**
     * init callback functions
     */
    this.initCallbacks = function() {
        var self = this;

        this._page.onError = function (message, stack) {
            console.log('-- error message -- ' + message);
        };

        this._page.onUrlChanged = function (url) {
            self._currentUrl = url;
            console.log('currentUrl = '+self._currentUrl);
        };

        this._page.onConsoleMessage = function (message, line, file) {
            console.log('-- console message -- ' + message);
        };

        this._page.onLoadFinished = function(status) {
            if(status !== 'success') {
                console.log("Sorry, the page is not loaded");
                self.close();
            }
            if (typeof self.route !== 'function') {
                throw new Error('Method route() not found. You should create them.');
            }
            self.route();
        };
    };
}

exports.create = function() {
    return new Grab();
};
