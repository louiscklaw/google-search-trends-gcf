#!/usr/bin/env mocha
const path = require( 'path' );

const TEST_HOME = __dirname;
const PROJ_HOME = path.join( __dirname, '..' )
const SRC_HOME = path.join( PROJ_HOME, 'src' );

const vars = require( path.join(SRC_HOME, 'vars.js') );

var chai = require('chai')
  , chaiHttp = require('chai-http');

var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style

const TEST_SERVER_AND_PORT = 'localhost:8082';
const TEST_API_SERVER = 'http://' + TEST_SERVER_AND_PORT;

chai.use(chaiHttp);

function prepare_request ( dest_server ) {
  return chai.request( dest_server );
}

function prepare_post_request ( dest_server, post_end_point ) {
  return prepare_request( dest_server )
    .post(post_end_point)
}
function prepare_json_post_request ( dest_server, post_end_point, json_body ) {
  return prepare_post_request( dest_server, post_end_point )
    .set( 'content-type', 'application/json' );
}

function prepare_get_request ( dest_server, get_end_point ){
  return prepare_request( dest_server )
    .get( get_end_point );
}

describe( 'test helloworld', () => {
  it( 'api server local get loopback', () => {
    prepare_get_request( TEST_API_SERVER,'/?q=test' )
      .end( ( err, res ) => {
        expect( res ).to.have.status( 200 );
        assert( res.text == 'test OK', 'test fail' );
      })
  } )
  it( 'api server local post loopback', () => {
    prepare_json_post_request( TEST_API_SERVER, '/' )
      .send( { 'test': {'foo':'bar'} } )
      .end( ( err, res ) => {
        assert( res.text == '{"foo":"bar"}', 'post loopback test not OK' );
      })
  } )

})
