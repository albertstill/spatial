const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Query {
    addPosition(
      timestamp: Float!
      latitude: Float!
      longitude: Float!
      accuracy: Float
      altitude: Float
      altitudeAccuracy: Float
      heading: Float
      speed: Float
    ): Boolean!
  }
`);
