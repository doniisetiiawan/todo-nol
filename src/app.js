import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import { GET_USER } from './constants';
import TodoApp from './components/todoApp';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: '/graphql',
});

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Query
        query={GET_USER}
        variables={{
          // Mock authenticated ID that matches database
          userId: 'me',
        }}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading</div>;
          }

          if (error) {
            return <div>{error.message}</div>;
          }

          return <TodoApp user={data.user} />;
        }}
      </Query>
    </ApolloProvider>,
    rootElement,
  );
}
