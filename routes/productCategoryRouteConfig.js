function productCategoryRouteConfi( app ){
    this.app = app;
    this.routeTable = [];
    this.init();
}

productCategoryRouteConfi.prototype.init = function(){
    var self = this;

    self.addRoutes();
    self.processRoutes();
}

productCategoryRouteConfi.prototype.processRoutes = function(){
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

productCategoryRouteConfi.prototype.addRoutes = function(){
    var self = this;

    var routes    = [{
            requestType: 'get',
            requestUrl: '/createProductCategory',
            callbakcFunction: function( request, response ){
                response.render('createProductCategory', {
                    title: "Create Product Category"
                });
            }
        }, {
            requestType: 'get',
            requestUrl: '/viewProductCategory',
            callbakcFunction: function( request, response ){
                response.render('viewProductCategory', {
                    title: "View Product Category"
                });
            }
        }, {
            requestType: 'get',
            requestUrl: '/getAllProductCategory',
            callbakcFunction: function( request, response ){
                var productCategoryDao = require('../Server/Dao/productCategoryDao.js');
                productCategoryDao.productCategoryDao.getAllProductCategory(
                    function( productCategories ){
                        console.log( productCategories );
                        response.json({ productCategories: productCategories });
                    }
                );
            }
        }, {
            requestType: 'post',
            requestUrl: '/createProductCategory',
            callbakcFunction: function( request, response ){
                var productCategoryDao = require('../Server/Dao/productCategoryDao.js');

                productCategoryDao
                .productCategoryDao
                .createProductCategory( request.body, function( status ){
                    response.json( status );
                });
            }
        }, {
            requestType: 'get',
            requestUrl: '/editProductCategory/:productCategoryId',
            callbakcFunction: function( request, response ){
                response.render('editProductCategory', {
                    title: "Edit Product Category"
                });
            }
        }, {
            requestType: 'get',
            requestUrl: '/editProductCategory/:productCategoryId',
            callbakcFunction: function( request, response ){
                response.render('editProductCategory', {
                    title: "Edit Product Category"
                });
            }
        }, {
            requestType: 'get',
            requestUrl: '/getProductCategoryById/:productCategoryId',
            callbakcFunction: function( request, response ){
                var productCategoryDao = require('../Server/Dao/productCategoryDao.js');

                productCategoryDao
                .productCategoryDao
                .getProductCategoryById( request.params.productCategoryId, function( productCategories ){
                    response.json({ productCategories: productCategories });
                });
            }
        }, {
            requestType: 'put',
            requestUrl: '/updateProductCategory',
            callbakcFunction: function( request, response ){
                var productCategoryDao = require('../Server/Dao/productCategoryDao.js');

                productCategoryDao
                .productCategoryDao
                .updateProductCategory( request.body, function( status ){

                    response.json( status );
                });
            }
        }, {
            requestType: 'delete',
            requestUrl: '/deleteProductCategoryById/:productCategoryId',
            callbakcFunction: function( request, response ){
                var productCategoryDao = require('../Server/Dao/productCategoryDao.js');

                productCategoryDao
                .productCategoryDao
                .deleteProductCategoryById( request.params.productCategoryId, function( status ){

                    response.json( status );
                });
            }
        }
    ];

    routes.forEach( function( route ){
        self.routeTable.push( route );
    });
    /*self.routeTable.push({
        requestType: 'get',
        requestUrl: '/createProductCategory',
        callbakcFunction: function( request, response ){
            response.render('createProductCategory', {
                title: "Create Product Category"
            });
        }
    });*/
}

module.exports = productCategoryRouteConfi;
