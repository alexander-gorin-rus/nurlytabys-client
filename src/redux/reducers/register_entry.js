import { ENRTY_STATUS_DEFAULT, ENTRY_FAIL, ENTRY_LOADED, ENTRY_SUCCESS } from '../types';

const initialState = {
    entry_token: localStorage.getItem('entry_token'),
    access_granted: null,
    access_info: null
}

export default function(state = initialState, action){
    const { type, payload } = action;

    switch(type){
        case ENTRY_LOADED:
            return {
                ...state,
                access_granted: true,
                access_info: payload
            }
        case ENTRY_SUCCESS: 
            localStorage.setItem('entry_token', payload.entry_token);
            return {
                ...state,
                ...payload,
                access_granted: true
            };
        case ENRTY_STATUS_DEFAULT:
        case ENTRY_FAIL:
            localStorage.removeItem('entry_token');
            return {
                ...state,
                entry_token: null,
                access_granted: null,
                access_info: null
            }
        default:
            return state;
    }
}