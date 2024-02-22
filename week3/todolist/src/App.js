import React, { useState } from 'react';
import './App.css';

const TodoList = () => {
  const [todos, settodos] = useState([]);
  const [newtodo, setnewtodo] = useState('');
  const [edit, setedit] = useState(null);
  const [editedtodo, seteditedtodo] = useState('');

  const addtodo = () => {
    if (newtodo.trim() !== '') {
      settodos([...todos, { text: newtodo, id: Date.now() }]);
      setnewtodo('');
    }
  };

  const startediting = (index) => {
    setedit(index);
    seteditedtodo(todos[index].text);
  };

  const updatetodo = () => {
    const updatedtodos = [...todos];
    updatedtodos[edit].text = editedtodo;
    settodos(updatedtodos);
    setedit(null);
    seteditedtodo('');
  };

  const deletetodo = (index) => {
    const updatedtodos = todos.filter((_, i) => i !== index);
    settodos(updatedtodos);
    setedit(null);
    seteditedtodo('');
  };
  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div className="add-todo">
        <input type="text" placeholder="New todo Task" value={newtodo} onChange={(e) => setnewtodo(e.target.value)} />
        <button className="add-button" onClick={addtodo}>Add</button>
      </div>
      <div className="created-todos-container">
        <h2>Created Todo Tasks</h2>
        {todos.length === 0 ? (
          <p>No todos created yet.</p>
        ) : (
          <ul className="todo-list">
            {todos.map((todo, index) => (
              <li key={todo.id} className="todo-list-item">
                <span>{index + 1}. </span>
                {edit === index ? (
                  <>
                    <input type="text" value={editedtodo} onChange={(e) => seteditedtodo(e.target.value)} />
                    <button className="update-button" onClick={updatetodo}>Update</button>
                  </>
                ) : (
                  <>
                    <span>{todo.text}</span>
                    <button className="edit-button" onClick={() => startediting(index)}>Edit</button>
                    <button className="delete-button" onClick={() => deletetodo(index)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};  

export default TodoList;
