/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useMutation } from '@apollo/client';
import { GET_USER, MARK_ALL_TODOS } from '../constants';
import Todo from './todo';

function TodoList({
  user: { todos, totalCount, completedCount },
}) {
  const [markAllTodos] = useMutation(MARK_ALL_TODOS, {
    refetchQueries: [
      { query: GET_USER, variables: { userId: 'me' } },
    ],
  });

  const handleMarkAllChange = () => {
    if (todos) {
      markAllTodos();
    }
  };

  return (
    <section className="main">
      <input
        checked={totalCount === completedCount}
        className="toggle-all"
        onChange={handleMarkAllChange}
        type="checkbox"
      />

      <label htmlFor="toggle-all">
        Mark all as complete
      </label>

      <ul className="todo-list">
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  );
}

export default TodoList;
