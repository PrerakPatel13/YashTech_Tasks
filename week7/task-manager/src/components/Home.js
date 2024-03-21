import React from 'react';
import { Link } from 'react-router-dom';
import todoImage from '../todo.webp';
import '../styles.css'; 

const Home = () => {
  return (
    <div className="center-content">
      <h1>Welcome to Task Management App</h1>
      <p>To use the Task Management App, you must be logged in.</p>
      <p>Please <Link to="/login">login</Link> to continue.</p>
      <img src={todoImage} alt="Task Management App" />
    </div>
  );
};

export default Home;
