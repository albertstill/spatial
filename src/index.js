const { formatError } = require('graphql/error');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const schema = require('./schema');
const db = require('./db');
const rootValue = require('./root-value');

const app = express();
const mapHtml = fs.readFileSync(path.join(__dirname, 'map.html'), { encoding: 'utf8' });
const trackerHtml = fs.readFileSync(path.join(__dirname, 'tracker.html'), { encoding: 'utf8' });

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
          let errorFormatted;
          if (error.message && error.message.includes('apiKey')) {
            errorFormatted = formatError({
              message: 'Hidden message because it included `apiKey`',
              locations: error.locations,
              path: error.path,
            });
          }
          errorFormatted = formatError(error);

          console.error(errorFormatted);
          return errorFormatted;
        },
  }),
);

async function mapHandler(req, res) {
  const pointsQuery = await db.query('SELECT * FROM alberts_movements');

  res.send(mapHtml.replace(
    '__POINTS_ARRAY__',
    JSON.stringify(pointsQuery.rows.map(({
      latitude, longitude,
    }) => ({
      lat: latitude,
      lng: longitude,
    }))),
  ));
}

app.get('/', (req, res, next) => {
  mapHandler(req, res).catch(next);
});

app.get('/tracker', (req, res) => {
  res.send(trackerHtml);
});

const PORT = process.env.PORT || 3000;
// eslint-disable-next-line no-console
console.log(`Starting the GraphQL server on port ${PORT}...`);
app.listen(PORT);
