import {
    CREATE_ROLE_SUCCESS,
    CREATE_ROLE_FAIL,
    LOAD_ALL_ROLES_FAIL,
    LOAD_ALL_ROLES_SUCCESS,
    DELETE_ROLE_SUCCESS,
    DELETE_ROLE_FAIL,
    LOAD_ROLE_BY_ID_SUCCESS,
    LOAD_ROLE_BY_ID_FAIL,
    UPDATE_ROLE_SUCCESS,
    UPDATE_ROLE_FAIL
} from '../types'

const initialState = {
    create_role: {},
    load_all_roles: [],
    role: {},
    role_deleted: false,
    updated_role: {},
    loading: true
}

export default function(state = initialState, action){
    const { type, payload } = action;

    switch(type){
        case CREATE_ROLE_SUCCESS:
            return {
                ...state,
                create_role: payload,
                loading: false
            }
        case CREATE_ROLE_FAIL:
            return {
                ...state,
                create_role: {}
            }
        case LOAD_ALL_ROLES_SUCCESS:
            return {
                ...state,
                load_all_roles: payload,
                loading: false
            }
        case LOAD_ALL_ROLES_FAIL:
            return {
                ...state,
                load_all_roles: [],
                loading: false
            }
        case DELETE_ROLE_SUCCESS:
            return {
                ...state,
                role_deleted: true,
                loading: false
            }
        case DELETE_ROLE_FAIL:
            return {
                ...state,
                role_deleted: false,
                loading: false
            }
        case LOAD_ROLE_BY_ID_SUCCESS:
            return {
                ...state,
                role: payload,
                loading: false
            }
        case LOAD_ROLE_BY_ID_FAIL:
            return {
                ...state,
                role: {},
                loading: false
            }
        case UPDATE_ROLE_SUCCESS: 
            return {
                ...state,
                updated_role: payload,
                loading: false
            }
        case UPDATE_ROLE_FAIL: 
            return {
                ...state,
                updated_role: {},
                loading: false
            }
        default:
            return state
    }
}