var fs = require('fs');

function FileHelper() {

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

    this.write = function(path_to_file, content, mode) {
        fs.write(path_to_file, content, mode);
    }

    this.writeJson = function(path_to_file, content, mode) {
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
