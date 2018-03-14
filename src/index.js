const { formatError } = require('graphql/error');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const schema = require('./schema');
const rootValue = require('./root-value');

const app = express();

app.set('trust proxy', true);

app.use(
  '/graphql',
  cors({
    origin: ['https://spatial.herokuapp.com', 'http://localhost:3000'],
  }),
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
    formatError:
      process.env.NODE_ENV === 'development'
        ? (error) => {
          console.error(error);
          return {
            message: error.message,
            locations: error.locations,
            stack: error.stack,
            path: error.path,
          };
        }
        : (error) => {
          if (error.message && error.message.includes('apiKey')) {
            return formatError({
              message: 'Hidden message because it included `apiKey`',
              locations: error.locations,
              path: error.path,
            });
          }
          return formatError(error);
        },
  }),
);

const PORT = process.env.PORT || 4000;
// eslint-disable-next-line no-console
console.log(`Starting the GraphQL server on port ${PORT}...`);
app.listen(PORT);
