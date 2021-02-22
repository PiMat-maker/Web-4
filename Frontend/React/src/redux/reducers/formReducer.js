import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "form",
  initialState: {
    x: [],
    y: 0,
    r: [],
    answer: "",
    table: []
  },
  reducers: {
    setX: (state, action) => {
      state.x = action.payload;
    },

    setY: (state, action) => {
      state.y = action.payload;
    },

    setR: (state, action) => {
      state.r = action.payload;
    },

    setAnswer: (state, action) => {
      state.answer = action.payload;
    },

    setTable: (state, action) => {
      state.table = action.payload;
    },

    unset: (state) =>{
      state.x = [];
      state.y = 0;
      state.r = [];
      state.answer = "";
      state.table = [];
    }
  }
});

export const { setX, setY, setR, setAnswer, setTable, unset } = formSlice.actions;

export default formSlice.reducer;
