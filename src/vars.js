
const path = require( 'path' );

module.exports = {
  GCF_PATH: '.',
  RUN_ENV: process.env.RUN_ENV || 'production',
  PAGE_SERVER: (this.RUN_ENV == 'production'? '*': 'http://localhost:8081'),
  // for routing
  Q_DAILY_TRENDS: "dailyTrends",
  Q_INTEREST_OVER_TIME: "interestOverTime",
  Q_INTEREST_BY_REGION: "interestByRegion",
  Q_REAL_TIME_TRENDS: "realTimeTrends",
  Q_RELATED_QUERIES: "relatedQueries",
  Q_RELATED_TOPICS: "relatedTopics",

  ERR_GET_CALL_METHOD_NOT_HANDLED: 'the request method not handled',
  ERR_SENDING_OUT_RESULT: 'err_sending_out_result'
}
