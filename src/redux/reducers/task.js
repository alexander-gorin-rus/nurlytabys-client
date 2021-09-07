import {
    CREATE_TASK_SUCCESS,
    CREATE_TASK_FAIL
} from '../types';

const initialState = {
    create_task: {},
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
        default: 
            return state
    }
}