
var connectionProvider = require('../mysqlConnectionStringProvider');

var productCategoryDao = {
    createProductCategory: function( productCategory, OnSuccessfullCallback ){
        var insertStatement = "Insert Into productcategory SET?";
        var category = {
            CategoryName: productCategory.categoryName,
            Details: productCategory.details,
            IsValid: productCategory.isValid,
            CreatedDate: new Date()
        };
        var connection = connectionProvider
            .mysqlConnectionStringProvider
            .getMySqlConnection();

        if( connection ){
            connection.query( insertStatement, category, function( err, result ){
                if( err ){
                    throw err;
                }

                OnSuccessfullCallback({
                    status: 'successfull',
                    message: "The Product Category Added Successfull !"
                });
            });
        }
    },
    getAllProductCategory: function( callback ){
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "Select * From productcategory Order By Id Desc";

        if( connection ){
            connection.query( queryStatement, function( err, rows, fields ){
                if( err ){ throw err; }

                callback( rows );
            });

            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection( connection );
        }
    },
    getProductCategoryById: function( productCategoryId, callback ){
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "Select * From productcategory Where Id = ?";

        if( connection ){
            connection.query( queryStatement, [ productCategoryId ], function( err, rows, fields ){
                if( err ){ throw err; }

                callback( rows );
            });

            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection( connection );
        }
    },
    updateProductCategory: function( productCategory, callback ){
        var table    = [];
        var modifiedDate      = productCategory.ModifiedDate || new Date();
        var connection        = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement    = "Update productcategory Set CategoryName = ?,"
        + "Details = ?, " // , IsValid = ? "
        + "ModifiedDate = ? "
        + "Where Id = ?";

        Object.keys( productCategory ).forEach( function( key ){
            var val    = productCategory[ key ];
            table.push( val );
        });
        table.splice( table.length -1, 0, modifiedDate );

        if( connection ){
            connection.query( queryStatement, table, function( err, rows, fields ){
                if( err ){ throw err; }

                if( rows )
                    callback({
                        status: 'successfull',
                        message: "The Product Category Updated Successfull !",
                        "data": rows
                    });
            });

            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection( connection );
        }
    },
    deleteProductCategoryById: function( productCategoryId, callback ){
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "Delete From productcategory Where Id = ?";

        if( connection ){
            connection.query( queryStatement, [ productCategoryId ], function( err, rows, fields ){
                if( err ){ throw err; }

                if( rows )
                    callback({
                        status: 'successfull',
                        message: 'Product Category has  gone Deleted !'
                    });
            });

            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection( connection );
        }
    }
};

module.exports.productCategoryDao = productCategoryDao;
