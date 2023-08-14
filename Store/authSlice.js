import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem("token") || null;
    const user = localStorage.getItem("user") || null;
    return {
      token: token,
      user: user ? JSON.parse(user) : null,
    };
  }
  return {
    token: null,
    user: null,
  };
};

const initialState = getInitialState();
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
