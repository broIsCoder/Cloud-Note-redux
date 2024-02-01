import { createSlice } from "@reduxjs/toolkit";

export const host = "http://localhost:5000";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,       // use true if you do not have mongodb (only ui)
    authToken: null,
    email: null,
    name: null,
  },
  reducers: {
    logOut(state) {
      state.isLoggedIn = false;
    },
    logIn(state) {
      state.isLoggedIn = true;
    },
    setUserInfo(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
