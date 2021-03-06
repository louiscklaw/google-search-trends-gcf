const path = require( 'path' );
const fs = require( 'fs' );
const vars = require( path.join(__dirname,'vars.js') );

const common = require( path.join( __dirname, 'common.js' ) );
const gcf_util = require( path.join( __dirname, 'gcf_util.js' ) );


const get_call_solver = {
  q: handle_get_q_call,
  content: handle_get_content_call
}

const req_solver = {
  'OPTIONS': handle_option_call,
  'GET': handle_get_call,
  'POST': handle_post_call
}

const trends_solver = {};
trends_solver[vars.Q_DAILY_TRENDS] = gcf_util.dailyTrends;
trends_solver[vars.Q_INTEREST_OVER_TIME] = gcf_util.interestOverTime;
trends_solver[vars.Q_INTEREST_BY_REGION] = gcf_util.interestByRegion;
// trends_solver[vars.Q_REAL_TIME_TRENDS] = gcf_util.re
trends_solver[vars.Q_RELATED_QUERIES] = gcf_util.relatedQueries
trends_solver[vars.Q_RELATED_TOPICS] = gcf_util.relatedTopics;

function print_params ( name, val ) {
  console.log( [name, val].join( ':' ) );
}

function print_run_config () {
  console.log( '\n' );
  console.log( 'print run config:' );
  console.log( '---------------------------------' );
  print_params( 'RUN_ENV', vars.RUN_ENV );
  print_params( 'PAGE_SERVER', vars.PAGE_SERVER );
  console.log( '---------------------------------' );
  console.log('\n\n')
}

function send_required_func_not_found ( req, res ) {
  res.send( 'the requested function not found' );
}

function process_search_param( param_in ) {
  var output_d = {};
  Object.keys( param_in ).forEach( x => {
    switch ( x ) {
      case 'dayBack':
        // console.log( 'dayBack found' );
        var n = new Date();
        var startTime = n.getDate() - parseInt(param_in[x]);
        n.setDate( startTime );
        output_d['startTime'] = n;
        output_d['endTime'] = new Date();
        break;
      case 'startTime':
        output_d[x] = new Date( param_in[x] );
        break;
      case 'endTime':
        output_d[x] = new Date( param_in[x] );
        break;
      default:
        output_d[ x ] = param_in[ x ];
        break;
    }
  } )
  return output_d;
}
function handle_get_content_call ( req, res ) {
  return false;
}
function handle_get_call( req, res ) {
  if ( Object.keys( get_call_solver ).includes( Object.keys( req.query )[0] ) ) {
    get_call_solver[Object.keys( req.query )[0]](req, res);
  } else {
    console.error( vars.ERR_GET_CALL_METHOD_NOT_HANDLED );
    res.send( vars.ERR_GET_CALL_METHOD_NOT_HANDLED );
  }
}

function handle_get_q_call ( req, res ) {
  switch ( req.query.q ) {
    case 'test':
      res.send( 'test OK' );
      break;
    default:
      res.send( 'the q parameters not handled' );
      break;
  }
}

function send_response_json ( res, json_in ) {
  try {
    res.json( JSON.parse(json_in) );
  } catch (err) {
    console.error( vars.ERR_SENDING_OUT_RESULT );
    console.error( json_in );
  }
}

function handle_post_trends( req, res ) {
  // console.log( req.body.trends );

  if ( found_in_key( trends_solver, req.body.q ) ) {
    // console.log( process_search_param( req.body.param ) );
    trends_solver[req.body.q]( process_search_param(req.body.param) )
      .then( json_from_google => {
        send_response_json( res, json_from_google );
      } );

  } else {
    console.log( req.body.q );
    console.log( vars.Q_DAILY_TRENDS );
    send_required_func_not_found( req, res );
  }
}

function found_in_key ( obj, key_wanted ) {
  return Object.keys( obj ).indexOf( key_wanted ) > -1
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
  res.set( 'Access-Control-Allow-Origin',"*" );

  if ( Object.keys( req_solver ).indexOf( req.method ) > -1 ) {
    req_solver[ req.method ]( req, res );

  } else {
    res.send( 'req method not supported' );

  }
}

print_run_config();
module.exports.main_routes = main_routes;
