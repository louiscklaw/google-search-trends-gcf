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


function api_server_local_get_loopback () {
  it( 'api server local get loopback', () => {
    prepare_get_request( TEST_API_SERVER,'/?q=test' )
      .end( ( err, res ) => {
        expect( res ).to.have.status( 200 );
        assert( res.text == 'test OK', 'test fail' );
      })
  } )
}

function api_server_local_post_loopback () {
  it( 'api server local post loopback', () => {
    prepare_json_post_request( TEST_API_SERVER, '/' )
      .send( { 'test': {'foo':'bar'} } )
      .end( ( err, res ) => {
        assert( res.text == '{"foo":"bar"}', 'post loopback test not OK' );
      })
  } )

}

function daily_trend_test_call () {
  it( 'daily trend test call', () => {
    prepare_json_post_request( TEST_API_SERVER, '/' )
      .send( {
        q: vars.Q_DAILY_TRENDS,
        param: {
          startTime: '2019-01-01',
          endTime: '2019-01-02',
          geo: 'HK'
        }
      } )
      .end( check_res_is_json)
  })
}

function interestOverTime_test_call () {
  it( 'interestOverTime test call', () => {
    prepare_json_post_request( TEST_API_SERVER, '/' )
      .send( {
        q: vars.Q_INTEREST_OVER_TIME,
        param: {
          startTime: '2019-01-01',
          endTime: '2019-01-02',
          geo: 'HK',
          keyword: 'apple'
        }
      } )
      .end( check_res_is_json)
  })
}

function interestByRegion_test_call () {
  it( 'interestByRegion test call', () => {
    prepare_json_post_request( TEST_API_SERVER, '/' )
      .send( {
        q: vars.Q_INTEREST_BY_REGION,
        param: {
          startTime: '2019-01-01',
          endTime: '2019-01-02',
          geo: 'HK',
          keyword: 'apple'
        }
      } )
      .end( check_res_is_json)
  })

}

function relatedQueries_test_call () {
  it( 'relatedQueries test call', () => {
    prepare_json_post_request( TEST_API_SERVER, '/' )
      .send( {
        q: vars.Q_RELATED_QUERIES,
        param: {
          startTime: '2019-01-01',
          endTime: '2019-01-02',
          geo: 'HK',
          keyword: 'apple'
        }
      } )
      .end( check_res_is_json)
  })

}

function relatedTopics_test_call () {
  it( 'relatedTopics test call', () => {
    prepare_json_post_request( TEST_API_SERVER, '/' )
      .send( {
        q: vars.Q_RELATED_TOPICS,
        param: {
          startTime: '2019-01-01',
          endTime: '2019-01-02',
          geo: 'HK',
          keyword: 'apple'
        }
      } )
      .end( check_res_is_json )
  })

}

function check_res_is_json ( err, res ) {

  return expect( res ).to.be.json;
}


describe( 'google trend api test', () => {
  describe( 'basic loopback', () => {
    api_server_local_get_loopback();
    api_server_local_post_loopback();
  })

  describe( 'google trend api test call', () => {
    daily_trend_test_call();
    interestByRegion_test_call();
    interestOverTime_test_call();
    relatedQueries_test_call();
    relatedTopics_test_call();
  })

})
