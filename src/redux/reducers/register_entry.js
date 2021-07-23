import { 
    ENRTY_STATUS_DEFAULT, 
    ENTRY_FAIL, ENTRY_LOADED, 
    ENTRY_SUCCESS, 
    PATH_TO_REGISTER_SUCCESS,
    PATH_TO_REGISTER_FAIL,
    LIST_OF_REGISTERS_FAIL,
    LIST_OF_REGISTERS_SUCCESS,
    DELETE_REGISTER_SUCCESS,
    DELETE_REGISTER_FAIL,
    GET_SINGLE_REGISTER_TO_UPDATE_FAIL,
    GET_SINGLE_REGISTER_TO_UPDATE_SUCCESS,
    UPDATE_REGISTER_SUCCESS,
    UPDATE_REGISTER_FAIL
} from '../types';

const initialState = {
    entry_token: localStorage.getItem('entry_token'),
    access_granted: null,
    access_info: null,
    create_path_to_register: null,
    list_of_registers: [],
    single_register: {},
    register_updated: {}
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
        case PATH_TO_REGISTER_SUCCESS: 
            return {
                ...state,
                create_path_to_register: payload
            }
        case PATH_TO_REGISTER_FAIL:
            return {
                ...state,
                create_path_to_register: null
            }
        case LIST_OF_REGISTERS_SUCCESS: 
            return {
                ...state,
                list_of_registers: payload
            }
        case GET_SINGLE_REGISTER_TO_UPDATE_SUCCESS:
            return {
                ...state,
                single_register: payload
            }
        case GET_SINGLE_REGISTER_TO_UPDATE_FAIL:
            return {
                ...state,
                single_register: {}
            }
        case UPDATE_REGISTER_SUCCESS: 
            return {
                ...state,
                register_updated: payload
            }
        case UPDATE_REGISTER_FAIL: 
            return {
                ...state,
                register_updated: {}
            }
        case LIST_OF_REGISTERS_FAIL:
        case DELETE_REGISTER_FAIL:
            return {
                ...state,
                list_of_registers: []
            }
        case DELETE_REGISTER_SUCCESS:
            return {
                ...state,
                list_of_registers: payload
            }
        default:
            return state;
    }
}