import { combineReducers } from "redux";
import authReducer from "./auth";
import actionReducer from "./actionReducer";

export default combineReducers({ auth: authReducer, data: actionReducer });
