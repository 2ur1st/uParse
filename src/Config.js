/**
 *
 * CONFIGURE FILE
 *
 */
var Config = function() {
    /**
     * @type {string} root url for starting parse
     */
    this.url = 'http://wolta.ru/catalog/svet-dlya-sada';

    this.viewportSize = {width: 480, height: 800};

    this.log_path = 'logs\\error.txt';
    this.result_file = 'result\\result.txt';
    this.debug = true;
};

Config.prototype.set = function(key, value) {
    this[key] = value;
};

Config.prototype.get = function(key) {
    return this[key];
};

exports.create = function() {
    return new Config();
};
