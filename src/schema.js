const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type RandomDie {
    numSides: Int!
  }

  type Query {
    getDie(numSides: Int!): RandomDie
  }
`);
