import { 
    REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    EMPLOYEE_LOADED,
    LOGOUT,
    ACCOUNT_DELETED,
    AUTH_ERROR,
    CLEAR_PROFILE,
    GET_EMPLOYEE_LIST_SUCCESS,
    GET_EMPLOYEE_LIST_FAIL,
    GET_EMPLOYEE_BY_ID_SUCCESS,
    GET_EMPLOYEE_BY_ID_FAIL,
    UPDATE_EMPLOYEE_SUCCESS,
    UPDATE_EMPLOYEE_FAIL,
    DELETE_EMPLOYEE_SUCCESS,
    DELETE_EMPLOYEE_FAIL
 } from '../types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    employee: null,
    employee_list: [],
    employee_by_id: null,
    updated_employee: null,
    boss: null,
    deleted_employee: false,
    loading: true,
}

export default function (state = initialState, action){
   const { type, payload } = action;

    switch(type){
        case EMPLOYEE_LOADED: 
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                employee: payload,
                //role: payload.role
                boss: payload.boss
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
           localStorage.setItem('token', payload.token)
           return {
               ...state,
               ...payload,
               isAuthenticated: true,
               loading: false,
               //role: payload.role
               boss: payload.boss
           };
        case GET_EMPLOYEE_LIST_SUCCESS: 
            return {
                ...state,
                employee_list: payload,
                load: false
            }
        case GET_EMPLOYEE_LIST_FAIL:
            return {
                ...state,
                employee_list: [],
                loading: false
            }
        case GET_EMPLOYEE_BY_ID_SUCCESS:
            return {
                ...state,
                employee_by_id: payload,
                loading: false
            }
        case GET_EMPLOYEE_BY_ID_FAIL:
            return {
                ...state,
                employee_by_id: null,
                loading: false
            }
        case UPDATE_EMPLOYEE_SUCCESS: 
            return {
                ...state,
                updated_employee: payload,
                loading: false
            }
        case UPDATE_EMPLOYEE_FAIL: 
            return {
                ...state,
                updated_employee: null,
                loading: false
            }
        case DELETE_EMPLOYEE_SUCCESS: 
            return {
                ...state,
                deleted_employee: true,
                loading: false
            }
        case DELETE_EMPLOYEE_FAIL:
            return {
                ...state,
                deleted_employee: false,
                loading: false
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
        case ACCOUNT_DELETED:
        case AUTH_ERROR:
        case CLEAR_PROFILE:
            localStorage.removeItem('token');
            localStorage.removeItem('entry_token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                //role: null
                boss: null
            };
        default:
            return state; 
    }
}