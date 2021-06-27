import { combineReducers } from "redux";
import employee_reducer from './employee_reducer';
import alert from './alert';
import register_entry from "./register_entry";

export default combineReducers({
    employee_reducer,
    alert,
    register_entry
});