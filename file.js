/**
 *
 * HELPER FOR WORKING WITH FILE SYSTEM
 *
 */
var fs = require('fs');

function FileHelper() {

    /**
     * read data from file
     * @param path_to_file string
     * @returns {Array} data from file
     */
    this.read = function(path_to_file) {
        if(!fs.isFile(path_to_file)){
            throw new Error('File ('+path_to_file+') not found');
        }
        var content = fs.read(path_to_file);
        if(!content.length) {
            throw new Error('File ('+path_to_file+') empty');
        }
        return content.split("\n");
    };

    /**
     * write data to file
     * @param path_to_file string
     * @param content string
     * @param mode string made of 'r', 'w', 'a/+', 'b' characters
     */
    this.write = function(path_to_file, content, mode) {
        fs.write(path_to_file, content, mode);
    };

    /**
     *
     * @param path_to_file
     * @param content
     * @param mode
     */
    this.stringify = function(path_to_file, content, mode) {
        var result = '';
        for(var i=0; i < content.length; i++) {
            result += JSON.stringify(content[i]) + "\n";
        }
        this.write(path_to_file, result, mode);
    }
}

exports.create = function() {
    return new FileHelper();
};
