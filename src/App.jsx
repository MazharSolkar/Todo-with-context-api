import { useState, useEffect } from 'react';
import { TodoContext } from './contexts/TodoContext';

import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

function App() {
  // Initialize todos state with localStorage data or an empty array
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos')) || []
  );

  // Save todos to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos, { ...todo }];
      return updatedTodos;
    });
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((prevtodo) =>
        prevtodo.id === id ? { ...prevtodo, ...updatedTodo } : prevtodo
      );
      return updatedTodos;
    });
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((prevtodo) => prevtodo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((prevtodo) =>
        prevtodo.id === id
          ? { ...prevtodo, completed: !prevtodo.completed }
          : prevtodo
      );
      return updatedTodos;
    });
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className='bg-gray-900 min-h-screen py-8'>
        <div className='w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white'>
          <h1 className='text-2xl font-bold text-center mb-8 mt-2'>
            Manage Your Tasks
          </h1>
          <div className='mb-4'>
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className='flex flex-wrap gap-y-3'>
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className='w-full'>
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoContext.Provider>
  );
}

export default App;
