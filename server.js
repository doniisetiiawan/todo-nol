import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import path from 'path';
import schema from './data/schema';
import resolvers from './data/resolvers';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(
  '/',
  express.static(path.resolve(__dirname, 'public')),
);

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    pretty: true,
    graphiql: true,
  }),
);

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`,
  );
});
