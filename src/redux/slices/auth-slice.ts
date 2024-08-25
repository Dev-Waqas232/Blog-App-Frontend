import { createSlice } from "@reduxjs/toolkit";

type initialState = {
  isAuthenticated: boolean;
  user: string | null;
};

const initialState: initialState = sessionStorage.getItem("authState")
  ? JSON.parse(sessionStorage.getItem("authState")!)
  : {
      isAuthenticated: false,
      user: null,
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      sessionStorage.setItem("authState", JSON.stringify(state));
    },
    logout: (state) => {
      (state.isAuthenticated = false), (state.user = null);
      sessionStorage.removeItem("authState");
    },
  },
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
