
const path = require( 'path' );

module.exports = {
  GCF_PATH: '.',
  RUN_ENV: process.env.RUN_ENV || 'production',
  // for routing
  Q_DAILY_TRENDS: "dailyTrends",
  Q_INTEREST_OVER_TIME: "interestOverTime",
  Q_INTEREST_BY_REGION: "interestByRegion",
  Q_REAL_TIME_TRENDS: "realTimeTrends",
  Q_RELATED_QUERIES: "relatedQueries",
  Q_RELATED_TOPICS: "relatedTopics",
}
