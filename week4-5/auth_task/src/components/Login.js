import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectIsLoggedIn } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({ username: '', password: '' });

  const handleLogin = () => {
    setErrors({ username: '', password: '' });

    if (!credentials.username) {
      setErrors((prevErrors) => ({ ...prevErrors, username: 'Username is required' }));
      return;
    }

    if (!credentials.password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Password is required' }));
      return;
    }

    if (credentials.username === 'test@gmail.com' && credentials.password === 'test123') {
      alert('Login successful');
      navigate('/dashboard');
      dispatch(login());
    } else {
      setErrors({ username: 'Invalid credentials', password: 'Invalid credentials' });
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {isLoggedIn && <p>You are already logged in.</p>}
      <div className="input-group">
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          className={`username-input ${errors.username && 'error'}`}
        />
        {errors.username && <p className="error-message">{errors.username}</p>}
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          className={`password-input ${errors.password && 'error'}`}
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
