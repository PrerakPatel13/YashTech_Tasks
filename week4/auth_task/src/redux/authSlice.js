import { createSlice } from '@reduxjs/toolkit';

const loadInitialState = () => {
  const storedState = localStorage.getItem('authState');
  return storedState ? JSON.parse(storedState) : { isAuthenticated: false };
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: loadInitialState(),
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
      localStorage.setItem('authState', JSON.stringify(state));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.setItem('authState', JSON.stringify(state));
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
