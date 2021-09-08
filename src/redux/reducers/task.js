import {
    CREATE_TASK_SUCCESS,
    CREATE_TASK_FAIL,
    TASK_CHANGE_SUCCESS,
    TASK_CHANGE_FAIL,
    TASK_DELETE_SUCCESS,
    TASK_DELETE_FAIL
} from '../types';

const initialState = {
    create_task: {},
    change_task: null,
    delete_task: false,
    loading: true
}

export default function(state = initialState, action){
    const { type, payload } = action

    switch(type){
        case CREATE_TASK_SUCCESS:
            return {
                ...state,
                create_task: payload,
                loading: false
            }
        case CREATE_TASK_FAIL:
            return {
                ...state,
                create_task: {},
                loading: false
            }
        case TASK_CHANGE_SUCCESS:
            return {
                ...state,
                change_task: payload,
                loading: false
            }
        case TASK_CHANGE_FAIL:
            return {
                ...state,
                change_task: null,
                loading: false
            }
        case TASK_DELETE_SUCCESS:
            return {
                ...state,
                delete_task: true,
                loading: false
            }
        default: 
            return state
    }
}