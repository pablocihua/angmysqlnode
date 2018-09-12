var express = require('express');
const bodyParser = require('body-parser');
var http = require('http');
var path = require('path');

var app = express();

var routes = require('./routes/index');
var productCategoryRoute = require('./routes/productCategoryRouteConfig');
var productRoute = require('./routes/productRouteConfig');


app.set('port', process.env.PORT || 3001 );
app.set('views', path.join( __dirname, 'views'));
app.set('view engine', 'ejs');

app.use( express.static( path.join( __dirname, 'public' )));
app.use('/bower_components', express.static( __dirname + '/bower_components' ));
// body Parser MW
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }) );

app.use( routes );

new productCategoryRoute( app );
new productRoute( app );

app.listen( app.get('port'), function( ){
    console.log('Server angMysqlCrud Started on Port: ' + app.get('port'));
});
