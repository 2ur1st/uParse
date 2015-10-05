/**
 * created by 2ur1st
 */
var Config = function() {

    this.host = 'http://example.ru';
    this.log_path = 'logs\\error.txt';
    this.result_file = 'result\\result.txt';
};

exports.getConfig = function() {
    return new Config();
};
