
function viewProductCategoryController( $scope, productCategoryService ){
    $scope.productCategories    = [];

    $scope.getAllProductCategories    = getAllProductCategories;

    function getAllProductCategories( ){
        productCategoryService.getAllProductCategories( )
        .then( function( response ){
            var data    = response.data;
            console.log( data, "success");
            if( data && data.productCategories && data.productCategories.length ){
                $scope.productCategories    = data.productCategories;
            }
        });
    }
}

productCategoryModule
.controller("viewProductCategoryController", viewProductCategoryController );
