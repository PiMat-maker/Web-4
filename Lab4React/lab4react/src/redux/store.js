import {applyMiddleware, compose, createStore} from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";
import { offline } from 'redux-offline';
import config from 'redux-offline/lib/defaults';

export default createStore(rootReducer, compose(applyMiddleware(thunk), offline(config)));
