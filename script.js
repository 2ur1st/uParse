/**
 *
 * Endpoint file
 *
 */
require.globals.urls = [];

var url = 'http://wolta.ru/catalog/svet-dlya-sada';
require.globals.urls.push(url);
var parser = require('./src/Parser').create();
parser.run();
