function productRouteConfi( app ){
    this.app = app;
    this.routeTable = [];
    this.init();
}

productRouteConfi.prototype.init = function(){
    var self = this;

    self.addRoutes();
    self.processRoutes();
}

productRouteConfi.prototype.processRoutes = function(){
    var self = this;

    self.routeTable.forEach( function( route ){
        if( route.requestType == 'get'){
            self.app.get( route.requestUrl, route.callbakcFunction );
        } else if( route.requestType == 'post'){
            self.app.post( route.requestUrl, route.callbakcFunction );
        } else if( route.requestType == 'delete'){
            self.app.delete( route.requestUrl, route.callbakcFunction );
        } else if( route.requestType == 'put'){
            self.app.put( route.requestUrl, route.callbakcFunction );
        }
    });
}

productRouteConfi.prototype.addRoutes = function(){
    var self = this;

    var routes    = [{
            requestType: 'get',
            requestUrl: '/createProduct',
            callbakcFunction: function( request, response ){
                response.render('createProduct', {
                    title: "Create Product "
                });
            }
        }, {
            requestType: 'get',
            requestUrl: '/viewProduct',
            callbakcFunction: function( request, response ){
                response.render('viewProduct', {
                    title: "View Product "
                });
            }
        }, {
            requestType: 'get',
            requestUrl: '/getAllProduct',
            callbakcFunction: function( request, response ){
                var productDao = require('../Server/Dao/productDao.js');
                productDao.productDao.getAllProduct(
                    function( productCategories ){
                        console.log( productCategories );
                        response.json({ productCategories: productCategories });
                    }
                );
            }
        }, {
            requestType: 'post',
            requestUrl: '/createProduct',
            callbakcFunction: function( request, response ){
                var productDao = require('../Server/Dao/productDao.js');

                productDao
                .productDao
                .createProduct( request.body, function( status ){
                    response.json( status );
                });
            }
        }, {
            requestType: 'get',
            requestUrl: '/editProduct/:productId',
            callbakcFunction: function( request, response ){
                response.render('editProduct', {
                    title: "Edit Product "
                });
            }
        }, {
            requestType: 'get',
            requestUrl: '/editProduct/:productId',
            callbakcFunction: function( request, response ){
                response.render('editProduct', {
                    title: "Edit Product "
                });
            }
        }, {
            requestType: 'get',
            requestUrl: '/getProductById/:productId',
            callbakcFunction: function( request, response ){
                var productDao = require('../Server/Dao/productDao.js');

                productDao
                .productDao
                .getProductById( request.params.productId, function( productCategories ){
                    response.json({ productCategories: productCategories });
                });
            }
        }, {
            requestType: 'put',
            requestUrl: '/updateProduct',
            callbakcFunction: function( request, response ){
                var productDao = require('../Server/Dao/productDao.js');

                productDao
                .productDao
                .updateProduct( request.body, function( status ){

                    response.json( status );
                });
            }
        }, {
            requestType: 'delete',
            requestUrl: '/deleteProductById/:productId',
            callbakcFunction: function( request, response ){
                var productDao = require('../Server/Dao/productDao.js');

                productDao
                .productDao
                .deleteProductById( request.params.productId, function( status ){

                    response.json( status );
                });
            }
        }
    ];

    routes.forEach( function( route ){
        self.routeTable.push( route );
    });
}

module.exports = productRouteConfi;
