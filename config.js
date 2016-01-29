/**
 *
 * CONFIGURE FILE
 *
 */
var Config = function() {
    this.log_path = 'logs\\error.txt';
    this.result_file = 'result\\result.txt';
};

exports.getConfig = function() {
    return new Config();
};
