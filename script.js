/**
 *
 * Endpoint file
 *
 */
var url = 'http://example.com/product';
var grab = require('./grab-products').create();
grab.init();
grab.setPageOptions('host', 'http://example.com');
grab.setPageOptions('viewportSize', {width: 480, height: 800});
grab.open(url);




