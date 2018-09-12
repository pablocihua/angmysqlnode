
function productService( $http, $location ){
    var service = {
        createProduct:              createProduct,
        getAllProductCategories:    getAllProductCategories,
        getProductById:             getProductById,
        getIdFromEndPoint:          getIdFromEndPoint,
        updateProduct:              updateProduct,
        deleteProductById:          deleteProductById
    };

    function createProduct( product ){
        var newProduct = {
            categoryName: product.categoryName,
            details: product.categoryDetails,
            isValid: product.isValid
        };

        var response = $http.post(
            '/createProduct',
            newProduct
        );

        return response;
    }

    function getAllProductCategories(){
        var response = $http.get(
            '/getAllProduct'
        );

        return response;
    }

    function getIdFromEndPoint(){
        var absoluteUrl = $location.absUrl();
        var segments    = absoluteUrl.split('/');
        var productId = segments[ segments.length -1 ];

        return productId;
    }

    function getProductById( productId ){
        var response = $http.get(
            '/getProductById/' + productId
        );

        return response;
    }

    function updateProduct( product, productId ){
        var upProduct = {
            categoryName: product.categoryName,
            details: product.categoryDetails,
            //modifiedDate: product.modifiedDate || new Date(),
            productId: productId
        };

        var response = $http.put(
            '/updateProduct',
            upProduct
        );

        return response;
    }

    function deleteProductById( productId ){
        var response = $http.delete('/deleteProductById/' + productId );

        return response;
    }


    return service;
}

productModule
.factory("productService", productService );
