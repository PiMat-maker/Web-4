import { combineReducers } from "@reduxjs/toolkit";
import formReducer from "./formReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  form: formReducer,
  user: userReducer
});

export default rootReducer;
