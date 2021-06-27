import { 
    REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    EMPLOYEE_LOADED,
    LOGOUT,
    ACCOUNT_DELETED,
    AUTH_ERROR,
    CLEAR_PROFILE
 } from '../types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    employee: null,
    role: null
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
                role: payload.role
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
           localStorage.setItem('token', payload.token)
           return {
               ...state,
               ...payload,
               isAuthenticated: true,
               loading: false,
               role: payload.role
           };
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
                role: null
            };
        default:
            return state; 
    }
}