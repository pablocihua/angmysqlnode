
function productCategoryService( $http, $location ){
    var service = {
        createProductCategory:      createProductCategory,
        getAllProductCategories:    getAllProductCategories,
        getProductCategoryById:     getProductCategoryById,
        getIdFromEndPoint:          getIdFromEndPoint,
        updateProductCategory:      updateProductCategory,
        deleteProductCategoryById:  deleteProductCategoryById
    };

    function createProductCategory( productCategory ){
        var newProductCategory = {
            categoryName: productCategory.categoryName,
            details: productCategory.categoryDetails,
            isValid: productCategory.isValid
        };

        var response = $http.post(
            '/createProductCategory',
            newProductCategory
        );

        return response;
    }

    function getAllProductCategories(){
        var response = $http.get(
            '/getAllProductCategory'
        );

        return response;
    }

    function getIdFromEndPoint(){
        var absoluteUrl = $location.absUrl();
        var segments    = absoluteUrl.split('/');
        var productCategoryId = segments[ segments.length -1 ];

        return productCategoryId;
    }

    function getProductCategoryById( productCategoryId ){
        var response = $http.get(
            '/getProductCategoryById/' + productCategoryId
        );

        return response;
    }

    function updateProductCategory( productCategory, productCategoryId ){
        var upProductCategory = {
            categoryName: productCategory.categoryName,
            details: productCategory.categoryDetails,
            //modifiedDate: productCategory.modifiedDate || new Date(),
            productCategoryId: productCategoryId
        };

        var response = $http.put(
            '/updateProductCategory',
            upProductCategory
        );

        return response;
    }

    function deleteProductCategoryById( productCategoryId ){
        var response = $http.delete('/deleteProductCategoryById/' + productCategoryId );

        return response;
    }


    return service;
}

productCategoryModule
.factory("productCategoryService", productCategoryService );
