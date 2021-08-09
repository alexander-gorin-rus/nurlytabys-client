import {
    CREATE_BUSINESS_SUCCESS,
    CREATE_BUSINESS_FAIL,
    GET_BUSINESS_LIST_SUCCESS,
    GET_BUSINESS_LIST_FAIL,
    GET_BUSINESS_BY_ID_SUCCESS,
    GET_BUSINESS_BY_ID_FAIL,
    DELETE_BUSINESS_SUCCESS,
    DELETE_BUSINESS_FAIL
} from '../types';

const initialState = {
    create_business: null,
    business_list: null,
    business_by_id: null,
    business_deleted: false,
    loading: true
}

export default function (state = initialState, action){
    const { type, payload } = action

    switch(type){
        case CREATE_BUSINESS_SUCCESS:
            return {
                ...state,
                create_business: payload,
                loading: false
            }
        case CREATE_BUSINESS_FAIL:
            return {
                ...state,
                create_business: null,
                loading: false
            }
        case GET_BUSINESS_LIST_SUCCESS:
            return {
                ...state,
                business_list: payload,
                loading: false
            }
        case GET_BUSINESS_LIST_FAIL:
            return {
                ...state,
                business_list: null,
                loading: false
            }
        case GET_BUSINESS_BY_ID_SUCCESS:
            return {
                ...state,
                business_by_id: payload,
                loading: false
            }
        case GET_BUSINESS_BY_ID_FAIL:
            return {
                ...state,
                business_by_id: null,
                loading: false
            }
        case DELETE_BUSINESS_SUCCESS:
            return {
                ...state,
                business_deleted: true,
                loading: false
            }
        case DELETE_BUSINESS_FAIL:
            return {
                ...state,
                business_deleted: false,
                loading: false
            } 
        default:
            return state
    }
}