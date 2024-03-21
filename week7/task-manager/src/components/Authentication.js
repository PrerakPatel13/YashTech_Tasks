
import React, { useState } from 'react';
import '../styles.css'; 

const Authentication = ({ isLoggedIn, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'user' && password === 'password') {
      onLogin();
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="authentication-container">
      {!isLoggedIn ? (
        <form onSubmit={handleLogin} className="login-form">
        <h2>Enter Login Credentials</h2>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      ) : (
        <p>You are logged in.</p>
      )}
    </div>
  );
}

export default Authentication;
