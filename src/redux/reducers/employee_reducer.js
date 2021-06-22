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
    employee: null,
    loading: true
}

export default function (state = initialState, action){
   const { type, payload } = action;

    switch(type){
        case EMPLOYEE_LOADED: 
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                isAuthenticated: true,
                employee: payload,
                loading: false
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
           localStorage.setItem('token', payload.token)
           return {
               ...state,
               ...payload,
               isAuthenticated: true,
               loading: false
           };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
        case ACCOUNT_DELETED:
        case AUTH_ERROR:
        case CLEAR_PROFILE:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                employee: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state; 
    }
}