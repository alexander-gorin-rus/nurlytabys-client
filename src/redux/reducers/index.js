import { combineReducers } from "redux";
import employee_reducer from './employee_reducer';
import alert from './alert';
import register_entry from "./register_entry";
import categories from "./categories";
import videos from './videos';
import main_page_info from './main_page_info';
import roles from './roles';
import business from "./business";
import task from './task'

export default combineReducers({
    employee_reducer,
    alert,
    register_entry,
    categories,
    videos,
    main_page_info,
    roles,
    business,
    task
});