/**
 *
 * @constructor
 */
function Logger() {

    this.debug = 1;

    this.init = function(level) {
        this.debug = level;
    };

    this.add = function(message) {
        if(this.debug) {
            console.log(message);
        }
    }

}

exports.create = function() {
    return new Logger();
};