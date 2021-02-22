import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {}
  },
  reducers: {
    login_user: (state, action) => {
      state.currentUser = action.payload;
    },

    logout_user: (state) => {
      state.currentUser = {};
      console.log("User = " + state.currentUser)
    }
  }
});

export const { login_user, logout_user } = userSlice.actions;

export default userSlice.reducer;
