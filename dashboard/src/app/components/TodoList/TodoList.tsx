'use client'

import { FormEvent, useState } from 'react';

import styles from './TodoList.module.scss';

export class TodoItem {
  value: string;
  key: number;

  constructor(value: string, key: number) {
    this.value = value;
    this.key = key;
  }
}

export type TodoListProps = {
  label?: string,
  items: TodoItem[],
}

export const TodoList = ({ label, items = [] }: TodoListProps) => {
  const [todos, setTodos] = useState(items);
  const [newItemValue, setNewItemValue] = useState('');

  const addItem = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newItemValue) return;
    setTodos(todos.concat(new TodoItem(newItemValue, Date.now())));
    setNewItemValue('');
  }

  const deleteItem = (itemKey: number) => {
    const index = todos.findIndex(todo => todo.key !== itemKey);
    todos.splice(index, 1);
    setTodos(todos);
  }

  return (
    <div className={ styles._ }>
      <span>{ label }</span>
      <form onSubmit={addItem}>
        <input
          type="text"
          placeholder="Enter task"
          value={newItemValue}
          onChange={e => setNewItemValue(e.target.value)}
        />
        <button type="submit">Add</button>
        <ul>
          {todos.map(todo => (
            <li key={todo.key} onClick={() => deleteItem(todo.key)}>{todo.value}</li>
          ))}
        </ul>
      </form>
    </div>
  );
}

// https://reactjs.org/docs/typechecking-with-proptypes.html
TodoList.defaultProps = {
  items: [],
} as TodoListProps;