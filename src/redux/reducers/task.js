import {
    CREATE_TASK_SUCCESS,
    CREATE_TASK_FAIL,
    TASK_CHANGE_SUCCESS,
    TASK_DELETE_SUCCESS,
    GET_TASK_BY_ID_SUCCESS,
    GET_TASK_BY_ID_FAIL,
    GET_ALL_TASKS_SUCCESS,
    GET_ALL_TASKS_FAIL,
    GET_TASKS_BY_ROLE_SUCCESS,
    GET_TASKS_BY_ROLE_FAIL,
    ADD_TASK_COMMENT,
    REMOVE_TASK_COMMENT,
    TASK_COMPLETED_SUCCESS,
    TASK_COMPLETED_FAIL,
    TASK_READ_SUCCESS,
    TASK_READ_FAIL,
    GET_TASKS_COUNT,
    UPDATE_TASKS_COUNT
} from '../types';

const initialState = {
    create_task: {},
    task_completed: null,
    delete_task: false,
    change_task: null,
    task_by_id: null,
    all_tasks: [],
    tasks_by_role: [],
    task: null,
    task_read: null,
    tasks_count: null,
    tasks_count_update: null,
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
        case TASK_COMPLETED_SUCCESS:
            return {
                ...state,
                task_completed: payload,
                loading: false
            }
        case TASK_COMPLETED_FAIL:
            return {
                ...state,
                task_completed: null,
                loading: false
            }
        case TASK_READ_SUCCESS:
            return {
                ...state,
                task_read: payload,
                loading: false
            }
        case TASK_READ_FAIL:
            return {
                ...state,
                task_read: null,
                loading: false
                }
        case TASK_CHANGE_SUCCESS:
            return {
                ...state,
                change_task: payload,
                loading: false
            }
        case GET_TASK_BY_ID_SUCCESS:
            return {
                ...state,
                task_by_id: payload,
                loading: false
            }
        case GET_TASK_BY_ID_FAIL:
            return {
                ...state,
                task_by_id: null,
                loading: false
            }
        case GET_ALL_TASKS_SUCCESS:
            return {
                ...state,
                all_tasks: payload,
                loading: false
            }
        case GET_ALL_TASKS_FAIL:
            return {
                ...state,
                all_tasks: [],
                loading: false
            }
        case GET_TASKS_BY_ROLE_SUCCESS:
            return {
                ...state,
                tasks_by_role: payload,
                loading: false
            }
        case GET_TASKS_BY_ROLE_FAIL:
            return {
                ...state,
                tasks_by_role: [],
                loading: false
            }
        case ADD_TASK_COMMENT: 
            return {
                ...state,
                task: { ...state.task, comments: payload }
            }
        case REMOVE_TASK_COMMENT: 
            return {
                ...state,
                task: {...state.task, 
                comments: state.task.comments.filter(
                    comment => comment._id !== payload
                )},
                loading: false
            }
        case GET_TASKS_COUNT:
            return {
                ...state,
                tasks_count: payload,
                loading: false
            }
        case UPDATE_TASKS_COUNT:
            return {
                ...state,
                tasks_count_update: payload,
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