import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Header from './components/Header';
import Footer from './components/Footer';
import Authentication from './components/Authentication';
import CreateTask from './components/CreateTask';
import Home from './components/Home';
import ViewTask from './components/ViewTask';
import ContentContainer from './components/ContentContainer';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, []);

  const handleLogin = () => setIsLoggedIn(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  const handleCreateTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = (taskId, updatedTask) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, ...updatedTask };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    toast.success('Task deleted successfully');
  };

  const handleStatusChange = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <Router>
      <div>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <ContentContainer>
          <Routes>
            <Route path="/login" element={<Authentication isLoggedIn={isLoggedIn} onLogin={handleLogin} />} />
            <Route path="/" element={<Home />} /> 
            <Route path="/create-task" element={isLoggedIn ? <CreateTask onCreate={handleCreateTask} /> : <Navigate to="/login" />} />
            <Route path="/view-task" element={isLoggedIn ? <ViewTask tasks={tasks} onEditTask={handleEditTask} onDeleteTask={handleDeleteTask} onStatusChange={handleStatusChange} /> : <Navigate to="/login" />} />
          </Routes>
        </ContentContainer>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
