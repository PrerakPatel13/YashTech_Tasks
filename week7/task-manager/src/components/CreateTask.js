import React, { useState } from 'react';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import "../styles.css";

const CreateTask = ({ onCreate }) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');

  const generateId = () => {
    return '_' + Math.random().toString(36).substr(2, 9); 
  };

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = generateId(); 
    onCreate({ id, taskName, description, status: "todo" });
    setTaskName('');
    setDescription('');
    toast.success('Task created successfully');
  };

  return (
    <div className="create-task-form-container">
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Task Name:
            <input type="text" value={taskName} onChange={handleTaskNameChange} />
          </label>
        </div>
        <div className="form-group">
          <label>
            Description:
            <input type="text" value={description} onChange={handleDescriptionChange} />
          </label>
        </div>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default CreateTask;
