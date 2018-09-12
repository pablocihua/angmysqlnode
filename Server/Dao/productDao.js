
var connectionProvider = require('../mysqlConnectionStringProvider');

var productDao = {
    createProduct: function( product, OnSuccessfullCallback ){
        var insertStatement = "Insert Into product SET?";
        var category = {
            Name: product.categoryName,
            Details: product.details,
            IsValid: product.isValid,
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
                    message: "The Product Added Successfull !"
                });
            });
        }
    },
    getAllProduct: function( callback ){
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "Select * From product Order By Id Desc";

        if( connection ){
            connection.query( queryStatement, function( err, rows, fields ){
                if( err ){ throw err; }

                callback( rows );
            });

            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection( connection );
        }
    },
    getProductById: function( productId, callback ){
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "Select * From product Where Id = ?";

        if( connection ){
            connection.query( queryStatement, [ productId ], function( err, rows, fields ){
                if( err ){ throw err; }

                callback( rows );
            });

            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection( connection );
        }
    },
    updateProduct: function( product, callback ){
        var table    = [];
        var modifiedDate      = product.ModifiedDate || new Date();
        var connection        = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement    = "Update product Set Name = ?,"
        + "Description = ?, "
        + "UpdatedDt = ? "
        + "Where Id = ?";

        Object.keys( product ).forEach( function( key ){
            var val    = product[ key ];
            table.push( val );
        });
        table.splice( table.length -1, 0, modifiedDate );

        if( connection ){
            connection.query( queryStatement, table, function( err, rows, fields ){
                if( err ){ throw err; }

                if( rows )
                    callback({
                        status: 'successfull',
                        message: "The Product Updated Successfull !",
                        "data": rows
                    });
            });

            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection( connection );
        }
    },
    deleteProductById: function( productId, callback ){
        var connection = connectionProvider.mysqlConnectionStringProvider.getMySqlConnection();
        var queryStatement = "Delete From product Where Id = ?";

        if( connection ){
            connection.query( queryStatement, [ productId ], function( err, rows, fields ){
                if( err ){ throw err; }

                if( rows )
                    callback({
                        status: 'successfull',
                        message: 'Product  has  gone Deleted !'
                    });
            });

            connectionProvider.mysqlConnectionStringProvider.closeMySqlConnection( connection );
        }
    }
};

module.exports.productDao = productDao;
