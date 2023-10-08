import React, { useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';

function TodoItem({ todo }) {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [todoMsg, setTodoMsg] = useState(todo.todo);

  const { updateTodo, deleteTodo, toggleComplete } = useContext(TodoContext);

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsReadOnly(true);
  };

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
        todo.completed ? 'bg-green-200' : 'bg-gray-400'
      }`}>
      <input
        type='checkbox'
        className='cursor-pointer'
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />
      <input
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isReadOnly ? 'border-transparent' : 'border-black/50 px-2'
        } ${todo.completed ? 'line-through' : ''}`}
        type='text'
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={isReadOnly}
      />
      {/* Edit, Save Button */}
      <button
        className='inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50'
        onClick={() => {
          if (todo.completed) return;

          isReadOnly ? setIsReadOnly(!isReadOnly) : editTodo();
        }}
        disabled={todo.completed}>
        {isReadOnly ? '✏️' : '📁'}
      </button>
      {/* Delete Todo Button */}
      <button
        className='inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0'
        onClick={() => deleteTodo(todo.id)}>
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
