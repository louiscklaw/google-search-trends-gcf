
const googleTrends = require( 'google-trends-api' );

module.exports.interestByRegion = ( search_setting_in ) => {
  return googleTrends.interestByRegion( search_setting_in );
}

module.exports.interestOverTime = ( search_setting_in ) => {
  return googleTrends.interestOverTime( search_setting_in );
}

module.exports.relatedTopics = ( search_settings_in ) => {
  return googleTrends.relatedTopics( search_settings_in );
}

module.exports.relatedQueries = ( search_settings_in ) => {
  return googleTrends.relatedQueries( search_settings_in );
}

module.exports.dailyTrends = ( search_settings_in ) => {
  return googleTrends.dailyTrends( search_settings_in );
}

module.exports.helloworld = () => {
  console.log( 'helloworld' );
}
