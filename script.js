/**
 *
 * Endpoint file
 *
 */
var url = 'http://wolta.ru/catalog/interernyj-svet';
var grab = require('./grab-products').create();
grab.init();
grab.setPageOptions('host', 'http://wolta.ru');
grab.setPageOptions('viewportSize', {width: 480, height: 800});
grab.open(url);
