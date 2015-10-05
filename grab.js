var file = require("./file").create();              
var config = require("./config").getConfig();     

function Grab() {

    this.page;                                      
    this.current_url;                             
    this.parentCategory;                           

    /**
     * метод инициализует объект
     * @param url string относительный адрес ( /contacts )
     * @param parent
     */
    this.init = function(url, parent) {
        this.page = require("webpage").create();    
        this.callbackInit();                       
        if(url) {                                  
            config.host += url;
        }
        this.parentCategory = parent;
        this.open(config.host);                       
    };

    this.open = function(url) {
        /*
         * место для возможной бизнес логики
         */
        this.page.open(url);                        
    };

    this.close = function() {
        this.page.close()
    };

    this.callbackInit = function() {
        var self = this;

        this.page.onError = function (message, stack) {
            console.log(message);
        };

        this.page.onUrlChanged = function (url) {
            self.current_url = url;                     
        };

        this.page.onConsoleMessage = function (message, line, file) {
            console.log(message);                       
        };

        this.page.onLoadFinished = function(status) {
            if(status !== 'success') {
                console.log("Sorry, the page is not loaded");
                self.close();
            }

            self.route();                               
        };
    };
}

Grab.prototype.route = function() {
    try {
        if(this.isCategoryPage()) {            
            var categories = this.getCategories();          
            file.writeJson(config.result_file, categories, 'a');   
            for (var i = 0; i < categories.length; i++) {   
                var url = categories[i].url_article;        
                new Grab().init(url, categories[i].title);  
                slimer.wait(3000);                          
            }
        } else {
            var content = this.getContent();                
            file.writeJson(config.result_file, content, 'a');      
            this.close();                                   
        }
        this.close();
    } catch(err) {
        console.log(err);
        this.close();
    }
};

Grab.prototype.getCategories = function() {
    return this.getContent('categories')
};

Grab.prototype.isCategoryPage = function() {
    return this.page.evaluate(function() {
        // определить присутствуют ли данные относящиеся к странице товаров
        return !$(".catalog-list .item .price").length;
    });
};

Grab.prototype.getContent = function(typeContent) {
    var result = this.page.evaluate(function(typeContent) {
        var result = [];
        $(".catalog-list .item").each(function(key, value) {
            var $link = $(value).find('a.name');               
            var obj = {                                         
                'type': 'category',
                'title': $link.text().trim().toLowerCase(),     
                'url_article': $link.attr('href'),              
                'url_article_image': $(value).find('a.img > img').attr('src')
            };

            if(typeContent !== 'categories') {
                obj.size = [];
                obj.type = 'product';
                $('.razmers:first .pink').each(function(key, value) {       
                    obj.size.push($(value).text().trim());
                });
                obj.price = parseInt($(value).find('.price').text(), 10);   
            }
            result.push(obj);
        });
        return result;
    }, typeContent);

    return result;
};

exports.create = function() {
    return new Grab();
};
