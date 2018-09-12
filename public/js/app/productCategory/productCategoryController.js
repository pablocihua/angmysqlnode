
function productCategoryController( $scope, $timeout, $window, productCategoryService, requiredFieldValidationService ){
    $scope.productCategories    = [];
    $scope.productCategory      = {
        categoryName: "",
        categoryDetails: "",
        isValid: true
    };

    $scope.message    = {
        containsValidationError: false,
        validationSummary: ""
    };
    $scope.validationResult    = {
        containsSuccessfulMessage: false,
        successfulMessage: ""
    };

    $scope.createProductCategory      = createProductCategory;
    $scope.getAllProductCategories    = getAllProductCategories;
    $scope.getProductCategoryById     = getProductCategoryById;
    $scope.editProductCategory        = editProductCategory;

    $scope.deleteProductCategoryById    = deleteProductCategoryById;

    function createProductCategory( productCategory ){
        var validationMessages = requiredFieldValidationService.getRequiredFieldValidationErrorMessage([
            { name: $scope.productCategory.categoryName || "", errorMessage: 'Please enter product category name'},
            { name: $scope.productCategory.categoryDetails || "", errorMessage: 'Please enter product category details'}
        ]);

        if( validationMessages.length > 0 ){
            $scope.validationResult.containsValidationError    = true;
            angular.element('#validationErrorMessage').empty();
            validationMessages.forEach( function( errorMessage ){

                angular
                .element('<li></li>')
                .html( errorMessage )
                .appendTo('#validationErrorMessage');
            })
        } else {
            $scope.validationResult.containsValidationError    = false;
            productCategoryService.createProductCategory( productCategory )
            .then( function( response ){
                var data    = response.data;

                if( data && data.status == 'successfull' ){ // && data.productCategories && data.productCategories.length > 0 ){
                    // $scope.productCategories    = data.productCategories;
                    displayMessage();
                    bootbox.alert( data.message, function( ){
                        $window.location.href = '/viewProductCategory';
                    });
                    $setTimeout(function () {
                        clearMessage();
                        clearProductCategory()
                    }, 5000 );
                }
            });
        }

        /*productCategoryService.createProductCategory( productCategory )
        .then( function( response ){
            var data    = response.data;

            if( data && data.productCategories && data.productCategories.length > 0 ){
                $scope.productCategories    = data.productCategories;
            }
            bootbox.alert( data.message, function( ){
                $window.location.href = '/viewProductCategory';
            });
        });*/
    }

    function editProductCategory( productCategory ){
        var validationMessages = requiredFieldValidationService.getRequiredFieldValidationErrorMessage([
            { name: $scope.productCategory.categoryName || "", errorMessage: 'Please enter product category name'},
            { name: $scope.productCategory.categoryDetails || "", errorMessage: 'Please enter product category details'}
        ]);

        if( validationMessages.length > 0 ){
            $scope.validationResult.containsValidationError    = true;
            angular.element('#validationErrorMessage').empty();
            validationMessages.forEach( function( errorMessage ){
                angular
                .element('<li></li>')
                .html( errorMessage )
                .appendTo('#validationErrorMessage');
            })
        } else {
            //productCategory.modifiedDate    = new Date();

            productCategoryService
            .updateProductCategory(
                productCategory,
                productCategoryService.getIdFromEndPoint()
            )
            .then( function( response ){
                var data    = response.data;

                if( data && data.status == 'successfull' ){
                    bootbox.alert( data.message, function( ){
                        console.log('Datos editados')
                        $window.location.href = '/viewProductCategory';
                    });
                }
            });
        }
    }

    function getAllProductCategories( ){
        productCategoryService.getAllProductCategories( )
        .then( function( response ){
            var data    = response.data;

            if( data && data.productCategories && data.productCategories.length ){
                $scope.productCategories    = data.productCategories;
            }
        });
    }

    function getProductCategoryById(){
        productCategoryService
        .getProductCategoryById( productCategoryService.getIdFromEndPoint() )
        .then( function( response ){
            var data    = response.data;

            if( data && data.productCategories && data.productCategories.length > 0 ){
                //$scope.productCategories    = data.productCategories;
                bindView( data.productCategories[ 0 ]);
            } else {
                bootbox.alert('It does not found product category.')
            }
        });
    }

    function deleteProductCategoryById( productCategoryId ){
        if( productCategoryId > 0 ){
            bootbox.confirm(
                "Are you sure, You want to delete this product category ?",
                function( result ){
                    console.log('This was logged in the callback: ' + result );
                    productCategoryService.deleteProductCategoryById( productCategoryId )
                    .then( function( response ){
                        var data    = response.data;

                        if( data && data.status && data.status == 'successfull' ){
                            bootbox.alert(
                                data.message,
                                function(){
                                    console.log('This was logged in the callback!');
                                    $window.location.href = '/viewProductCategory';
                                }
                            );
                        } else {
                            bootbox.alert('Something wrong!');
                        }
                    }, function( error ){
                        console.log( error );
                    });
                }
            );
        } else {
            console.log('Does not exists the product category id.');
        }
    }


    function bindView( productCategory ){
        $scope.productCategory.categoryName       = productCategory.CategoryName;
        $scope.productCategory.categoryDetails    = productCategory.Details;
    }

    function clearProductCategory(){
        $scope.productcategory.categoryName       = "";
        $scope.productcategory.categoryDetails    = "";
    }

    function clearMessage(){
        $scope.message.containsSuccessfulMessage     = "";
        $scope.message.successfulMessage             = "";
    }

    function displayMessage(){
        $scope.message.containsSuccessfulMessage     = true;
        $scope.message.successfulMessage             = "A record added successfully";
    }

}

productCategoryModule
.factory("requiredFieldValidationService", requiredFieldValidationService )
.controller("productCategoryController", productCategoryController );
