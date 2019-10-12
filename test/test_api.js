#!/usr/bin/env mocha

var chai = require('chai')
  , chaiHttp = require('chai-http');

var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style

const TEST_SERVER_AND_PORT = 'localhost:8082';

chai.use(chaiHttp);

describe( 'test helloworld', () => {
  it( 'hello chai-http', () => {
    chai.request( 'http://'+TEST_SERVER_AND_PORT )
      .get( '/?q=test' )
      .end( ( err, res ) => {
        expect( res ).to.have.status( 200 );
        assert( res.text == 'test OK', 'test fail' );
      })
  } )
  it( 'hello chai-post', () => {
    chai.request( 'http://'+TEST_SERVER_AND_PORT )
      .post('/')
      .set('content-type', 'application/json')
      .send( { 'test': {'foo':'bar'} } )
      .end( ( err, res ) => {
        assert( res.text == '{"foo":"bar"}', 'post loopback test not OK' );
      })
  })
})
