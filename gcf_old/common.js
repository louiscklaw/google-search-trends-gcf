
var path = require( 'path' );
var vars = require( 'vars.js' );

module.exports.pre_print = ( text_in ) => {
  return '<pre>' + text_in + '</pre>';
}

module.exports.check_debug_env = () => {
  return vars.RUN_ENV === 'DEBUG';
}
