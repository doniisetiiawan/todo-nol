import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import schema from './data/schema';
import resolvers from './data/resolvers';

const port = 3000;

const compiler = webpack({
  mode: 'development',
  devtool: 'eval-source-map',
  entry: [
    'whatwg-fetch',
    path.resolve(__dirname, 'src', 'app.js'),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  output: {
    filename: 'app.js',
    path: '/',
  },
});

const app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  publicPath: '/src/',
  stats: { colors: true },
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
