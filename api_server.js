const path = require( 'path' );

const express = require( 'express' );
const app = express();

const gcf_index = require( path.join( __dirname, 'src', 'index.js' ) );

app.use(express.urlencoded());
app.use(express.json());

app.all( '/', function ( req, res ) {
  gcf_index.main_routes( req, res );
} )

var server = app.listen( 8082, function () {
  var host = server.address().address
  var port = server.address().port
  console.log( "Example app listening at http://%s:%s", host, port )
} )
