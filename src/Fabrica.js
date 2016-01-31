/**
 *
 * @type {Object}
 */
var File = require("./File").create();
var Logger = require("./Logger").create();
var Config = require("./Config").create();
var Paginator = require("./Paginator").create();

var GrabProducts = require("./GrabProducts").create();
var GrabCategories = require("./GrabCategories").create();

function Fabrica() {

    this.init = function() {
        //ile.write('res.txt', 'hello', 'a');
        File.write('log.txt', 'result');
        console.log(File);
    };


    /**
     * init require function route
     */
    //this.route = function() {
    //    try {
    //        if(this.isCategoryPage()) {
    //            logger.add('get categories');
    //            this._categories = this.getCategories();
    //            setInterval(function() {
    //                Grab.prototype.scheduler();
    //            }, 1000);
    //        }
    //
    //        if(!this.isCategoryPage()) {
    //            logger.add('get page product');
    //            this.getProducts();
    //        }
    //        //this.close();
    //    } catch(err) {
    //        logger.add(err);
    //        this.exit();
    //    }
    //}
}

/**
 * TODO it is not work !!!
 */
//Grab.prototype.scheduler = function() {
//    console.log(!!this._sleep);
//    if(!this._categories.length && this._sleep) {
//        return;
//    }
//    var category = this._categories.shift();
//    Grab.sleep(true);
//    logger.add('Open page category ' + category.name);
//    Grab.open(category.url);
//};

exports.create = function() {
    return new Fabrica();
};