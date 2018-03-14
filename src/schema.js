const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Position {
    timestamp: String!
    latitude: Float!
    longitude: Float!
    accuracy: Float
    altitude: Float
    altitudeAccuracy: Float
    heading: Float
    speed: Float
  }

  type Query {
    addPosition(
      timestamp: String!
      latitude: Float!
      longitude: Float!
      accuracy: Float
      altitude: Float
      altitudeAccuracy: Float
      heading: Float
      speed: Float
    ): Boolean!
    positions: [Position!]!
  }
`);
