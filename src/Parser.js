/**
 *
 * @constructor
 */
var Config = require('./Config').create();
var GrabProducts = require('./GrabProducts').create();
var GrabCategories = require('./GrabCategories').create();

function Parser() {

    this.run = function() {
        var self = this;
        setInterval(function() {
            self.init();
        }, 1000);
    };

    this.init = function() {
        var url = require.globals.urls.pop();
        if(!url) {
            return false;
        }
        GrabCategories.init().open(url);
        GrabProducts.init().open(url);
    }

}

exports.create = function() {
    return new Parser();
};