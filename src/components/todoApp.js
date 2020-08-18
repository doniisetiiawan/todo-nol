import React from 'react';
import { Mutation } from '@apollo/client/react/components';
import { ADD_TODO, GET_USER } from '../constants';
import TodoTextInput from './todoTextInput';

function TodoApp({ user }) {
  console.log(user);
  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <Mutation
            mutation={ADD_TODO}
            refetchQueries={[
              {
                query: GET_USER,
                variables: { userId: 'me' },
              },
            ]}
          >
            {(addTodo) => (
              <TodoTextInput
                className="new-todo"
                onSave={(text) => addTodo({ variables: { text } })}
                placeholder="What needs to be done?"
              />
            )}
          </Mutation>
        </header>
      </section>
    </div>
  );
}

export default TodoApp;
