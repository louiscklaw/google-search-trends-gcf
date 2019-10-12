#!/usr/bin/env mocha

var expect = require( 'chai' ).expect;
var request = require('request');


describe( 'hello requests', () => {
  it('GET request', function(done) {
      request('http://localhost:8082/?q=test' , function(error, response, body) {
          expect(body).to.equal('test OK');
          done();
      } );
  });

})
