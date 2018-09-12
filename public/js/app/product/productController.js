
function productController( $scope, $timeout, $window, productService, requiredFieldValidationService ){
    $scope.products    = [];
    $scope.product     = {
        Name: "",
        ProductCategoryId: "",
        ProductCost: "",
        ProductSellingCost: "",
        Description: "",
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

    $scope.createProduct      = createProduct;
    $scope.getAllProducts     = getAllProducts;
    $scope.getProductById     = getProductById;
    $scope.editProduct        = editProduct;

    $scope.deleteProductById    = deleteProductById;

    function createProduct( product ){
        var validationMessages = requiredFieldValidationService.getRequiredFieldValidationErrorMessage([
            { name: $scope.product.Name || "", errorMessage: 'Please enter product name'},
            { name: $scope.product.ProductCategoryId || "", errorMessage: 'Please enter product category'},

            { name: $scope.product.ProductCost || "", errorMessage: 'Please enter product cost'},
            { name: $scope.product.ProductSellingCost || "", errorMessage: 'Please enter product selling cost'},
            { name: $scope.product.Description || "", errorMessage: 'Please enter product description'}
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
            productService.createProduct( product )
            .then( function( response ){
                var data    = response.data;

                if( data && data.status == 'successfull' ){
                    displayMessage();
                    bootbox.alert( data.message, function( ){
                        $window.location.href = '/viewProduct';
                    });
                    $setTimeout(function () {
                        clearMessage();
                        clearProduct()
                    }, 5000 );
                }
            });
        }
    }

    function editProduct( product ){
        var validationMessages = requiredFieldValidationService.getRequiredFieldValidationErrorMessage([
            { name: $scope.product.Name || "", errorMessage: 'Please enter product name'},
            { name: $scope.product.ProductCategoryId || "", errorMessage: 'Please enter product category'},

            { name: $scope.product.ProductCost || "", errorMessage: 'Please enter product cost'},
            { name: $scope.product.ProductSellingCost || "", errorMessage: 'Please enter product selling cost'},
            { name: $scope.product.Description || "", errorMessage: 'Please enter product description'}
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
            //product.modifiedDate    = new Date();

            productService
            .updateProduct(
                product,
                productService.getIdFromEndPoint()
            )
            .then( function( response ){
                var data    = response.data;

                if( data && data.status == 'successfull' ){
                    bootbox.alert( data.message, function( ){
                        console.log('Datos editados')
                        $window.location.href = '/viewProduct';
                    });
                }
            });
        }
    }

    function getAllProducts( ){
        productService.getAllProducts( )
        .then( function( response ){
            var data    = response.data;

            if( data && data.products && data.products.length ){
                $scope.products    = data.products;
            }
        });
    }

    function getProductById(){
        productService
        .getProductById( productService.getIdFromEndPoint() )
        .then( function( response ){
            var data    = response.data;

            if( data && data.products && data.products.length > 0 ){
                bindView( data.poducts[ 0 ]);
            } else {
                bootbox.alert('It does not found product.')
            }
        });
    }

    function deleteProductById( productId ){
        if( productId > 0 ){
            bootbox.confirm(
                "Are you sure, You want to delete this product ?",
                function( result ){
                    console.log('This was logged in the callback: ' + result );
                    productService.deleteProductById( productId )
                    .then( function( response ){
                        var data    = response.data;

                        if( data && data.status && data.status == 'successfull' ){
                            bootbox.alert(
                                data.message,
                                function(){
                                    console.log('This was logged in the callback!');
                                    $window.location.href = '/viewProduct';
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


    function bindView( product ){
        $scope.product.categoryName       = product.Name;
        $scope.product.categoryDetails    = product.Details;
    }

    function clearProduct(){
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

productModule
.factory("requiredFieldValidationService", requiredFieldValidationService )
.controller("productController", productController );
