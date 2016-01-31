/**
 *
 * @constructor
 */
var Config = require('./src/Config').create();
var GrabProducts = require('./src/GrabProducts').create();
var GrabCategories = require('./src/GrabCategories').create();

function Parser() {

    this._urls = [];

    this.init = function() {
        this.addUrl(Config.get('url'));
        this.scheduler();
    };

    this.addUrl = function(url) {
        if(typeof url !== 'object') {
            url = {'id': 1, 'url': url};
        }
        this._urls.push(url);
    };

    this.getUrl = function() {
        return this._urls.pop();
    };

    /**
     * TODO it is not work !!!
     */
    this.scheduler = function() {
        var self = this;
        var intervalID = setInterval(function() {
            self.run();
        }, 2000);
        //console.log(!!this._sleep);
        //if(!this._categories.length && this._sleep) {
        //    return;
        //}
        //var category = this._categories.shift();
        //Grab.sleep(true);
        //logger.add('Open page category ' + category.name);
        //Grab.open(category.url);
    };

    this.run = function() {
        var url = this.getUrl();
        if(!url) {
            return false;
        }
        var url = url.url;
        GrabCategories.init(this).open(url);
        //GrabProducts.init(this).open(url);

        //Fabrica.init(url);
    }

}

exports.create = function() {
    return new Parser();
};