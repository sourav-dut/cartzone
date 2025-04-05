import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    isLoggedIn: false,
    isMainCategory: false,
    mainCategoryId: null,
    mainCategoryName: null
  },
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      state.isLoggedIn = true
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    setCategory: (state, action) => {
      state.isMainCategory = action.payload.isMainCategory;
      state.mainCategoryId = action.payload.id;
      state.mainCategoryName = action.payload.name;
    },
  },
});

export const { setCredentials, logout, setCategory } = authSlice.actions;
export default authSlice.reducer;
