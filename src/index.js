const path = require( 'path' );
const fs = require( 'fs' );
const vars = require( path.join(__dirname,'vars.js') );

const common = require( path.join( __dirname, 'common.js' ) );
const gcf_util = require( path.join( __dirname, 'gcf_util.js' ) );


const req_solver = {
  'OPTIONS': handle_option_call,
  'GET': handle_get_call,
  'POST': handle_post_call
}

function send_required_func_not_found ( req, res ) {
  res.send( 'the requested function not found' );
}

function handle_get_call( req, res ) {
  if ( Object.keys( req.query ).indexOf( 'q' ) > -1 ) {
    handle_get_q_call( req, res );
  } else {
    send_required_func_not_found( req, res );
  }
}

function handle_get_q_call ( req, res ) {
  console.log( 'hello get' );

  switch ( req.query.q ) {
    case 'test':
      res.send( 'test OK' );
      break;
    default:
      res.send( 'the q parameters not handled' );
      break;
  }
}

function handle_option_call( req, res ) {
  res.set( 'Access-Control-Allow-Methods', 'GET' );
  res.set( 'Access-Control-Allow-Headers', 'Content-Type' );
  res.set( 'Access-Control-Max-Age', '3600' );
  res.status( 204 ).send( '' );
}

function handle_post_call ( req, res ) {


  if ( Object.keys( req.body ).indexOf( 'q' ) > -1 ) {
    handle_post_trends( req, res );

  } else if ( Object.keys( req.body ).includes( 'test' ) ) {
    res.send(req.body.test)
  } else {
    send_required_func_not_found( req, res );
  }
}

function main_routes ( req, res ) {
  res.set( 'Access-Control-Allow-Origin', '*' );

  if ( Object.keys( req_solver ).indexOf( req.method ) > -1 ) {
    req_solver[ req.method ]( req, res );

  } else {
    res.send( 'req method not supported' );

  }
}

module.exports.main_routes = main_routes;
