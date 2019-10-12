// routes.js
const path = require( 'path' );
const fs = require( 'fs' );

const vars = require( path.join(__dirname,'vars.js') );

const common = require( path.join( __dirname, 'common.js' ) );

const gcf_util = require( path.join( __dirname, 'gcf_util.js' ) );
const chartjs_util = require( path.join( __dirname, 'chartjs_util.js' ) );

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


function handle_option_call( req, res ) {
  res.set( 'Access-Control-Allow-Methods', 'GET' );
  res.set( 'Access-Control-Allow-Headers', 'Content-Type' );
  res.set( 'Access-Control-Max-Age', '3600' );
  res.status( 204 ).send( '' );
}

function handle_get_q_call( req, res ) {
  // {
  //   keyword: 'Donald Trump',
  //   startTime: new Date( '2017-02-01' ),
  //   endTime: new Date( '2017-02-06' ),
  //   resolution: 'CITY'
  // }
  switch ( req.query.q ) {
    default:
      res.send( 'the q parameters not handled' );
      break;
  }
}

function send_required_func_not_found( req, res ) {
  res.send( 'call type not found' + req.query );
}

function process_search_param( param_in ) {
  var output_d = {};
  Object.keys( param_in ).forEach( x => {
    switch ( x ) {
      case 'dayBack':
        console.log( 'dayBack found' );
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

function found_in_key ( obj, key_wanted ) {
  return Object.keys( obj ).indexOf( key_wanted ) > -1
}

function handle_post_trends( req, res ) {
  // console.log( req.body.trends );

  if ( found_in_key( trends_solver, req.body.q ) ) {
    console.log( process_search_param( req.body.param ) );
    trends_solver[req.body.q]( process_search_param(req.body.param) )
      .then( result => res.send( result ) );

  } else {
    console.log( req.body.q );
    console.log( vars.Q_DAILY_TRENDS );
    send_required_func_not_found( req, res );
  }
}

function handle_post_call( req, res ) {
  if ( Object.keys( req.body ).indexOf( 'q' ) > -1 ) {
    handle_post_trends( req, res );

  } else {
    send_required_func_not_found( req, res );
  }
}

function handle_get_call( req, res ) {
  if ( Object.keys( req.query ).indexOf( 'q' ) > -1 ) {
    handle_get_q_call( req, res );
  } else {
    send_required_func_not_found( req, res );
  }
}

module.exports.main_routes = ( req, res ) => {
  console.log( req.method );

  res.set( 'Access-Control-Allow-Origin', '*' );
  if ( Object.keys( req_solver ).indexOf( req.method ) > -1 ) {
    req_solver[ req.method ]( req, res );

  } else {
    res.send( 'req method not supported' );

  }

}


module.exports.helloworld = ( req, res ) => {
  res.send( 'helloworld from gcf' );
}
