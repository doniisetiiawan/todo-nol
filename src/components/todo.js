/* eslint-disable jsx-a11y/label-has-associated-control,jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import classnames from 'classnames';
import {
  CHANGE_TODO_STATUS,
  GET_USER,
  REMOVE_TODO,
  RENAME_TODO,
} from '../constants';
import TodoTextInput from './todoTextInput';

function Todo({ todo }) {
  const [isEditing, setIsEditing] = useState(false);

  const [changeTodoStatus] = useMutation(
    CHANGE_TODO_STATUS,
    {
      refetchQueries: [
        { query: GET_USER, variables: { userId: 'me' } },
      ],
    },
  );

  const [renameTodo] = useMutation(RENAME_TODO, {
    refetchQueries: [
      { query: GET_USER, variables: { userId: 'me' } },
    ],
  });

  const [removeTodo] = useMutation(REMOVE_TODO, {
    refetchQueries: [
      { query: GET_USER, variables: { userId: 'me' } },
    ],
  });

  const handleCompleteChange = (e) => {
    const complete = e.currentTarget.checked;

    changeTodoStatus({
      variables: { id: todo.id, complete },
    });
  };

  const handleRemoveTodo = () => {
    removeTodo({ variables: { id: todo.id } });
  };

  const handleDestroyClick = () => handleRemoveTodo();

  const handleLabelDoubleClick = () => setIsEditing(true);

  const handleTextInputCancel = () => setIsEditing(false);

  const handleTextInputDelete = () => {
    setIsEditing(false);
    handleRemoveTodo();
  };

  const handleTextInputSave = (text) => {
    setIsEditing(false);

    renameTodo({
      variables: {
        id: todo.id,
        text,
      },
    });
  };

  return (
    <li
      className={classnames({
        completed: todo.complete,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          checked={todo.complete}
          className="toggle"
          onChange={handleCompleteChange}
          type="checkbox"
        />

        <label onDoubleClick={handleLabelDoubleClick}>
          {todo.text}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={handleDestroyClick}
        />
      </div>

      {isEditing && (
        <TodoTextInput
          className="edit"
          commitOnBlur
          initialValue={todo.text}
          onCancel={handleTextInputCancel}
          onDelete={handleTextInputDelete}
          onSave={handleTextInputSave}
        />
      )}
    </li>
  );
}

export default Todo;
