
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles.css'; 

const ViewTask = ({ tasks, onEditTask, onDeleteTask, onStatusChange }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({ id: '', taskName: '', description: '', status: '' });

  const handleEditClick = (taskId) => {
    setEditingTaskId(taskId);
    const taskToEdit = tasks.find(task => task.id === taskId);
    setEditedTask(taskToEdit);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditedTask({ id: '', taskName: '', description: '', status: '' });
  };

  const handleSaveEdit = () => {
    onEditTask(editedTask.id, editedTask);
    setEditingTaskId(null);
    setEditedTask({ id: '', taskName: '', description: '', status: '' });
    toast.success('Task edited successfully');
  };

  const handleTitleChange = (event) => {
    setEditedTask({ ...editedTask, taskName: event.target.value });
  };

  const handleDescriptionChange = (event) => {
    setEditedTask({ ...editedTask, description: event.target.value });
  };

  const handleStatusChange = (event) => {
    setEditedTask({ ...editedTask, status: event.target.value });
    onStatusChange(editedTask.id, event.target.value);
  };

  const renderTaskCards = (status) => {
    const filteredTasks = tasks.filter(task => task.status === status);
    return (
      <div className="task-column">
        <h3>{status}</h3>
        {filteredTasks.map(task => (
          <div key={task.id} className="task-card">
            <h4>Title : {task.taskName}</h4>
            <p>Description : {task.description}</p>
            <div className="button-container">
              <button className="edit-button" onClick={() => handleEditClick(task.id)}>Edit</button>
              <button className="delete-button" onClick={() => onDeleteTask(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="view-task-container">
      <h2>View Task</h2>
      <div className="task-container">
        {renderTaskCards('todo')}
        {renderTaskCards('in-progress')}
        {renderTaskCards('in-review')}
        {renderTaskCards('completed')}
      </div>
      {editingTaskId !== null && (
        <div className="edit-task-form">
          <input type="text" value={editedTask.taskName} onChange={handleTitleChange} />
          <textarea value={editedTask.description} onChange={handleDescriptionChange} />
          <p>Status:
            <select value={editedTask.status} onChange={handleStatusChange}>
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="in-review">In Review</option>
              <option value="completed">Completed</option>
            </select>
          </p>
          <div className="button-container">
            <button className="save-button" onClick={handleSaveEdit}>Save</button>
            <button className="cancel-button" onClick={handleCancelEdit}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTask;
