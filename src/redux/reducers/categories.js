import { 
    CREATE_CATEGORY_FAIL, 
    CREATE_CATEGORY_SUCCESS, 
    GET_CATEGORIES, 
    GET_CATEGORY,
    UPDATE_CATEGORY, 
    GET_CATEGORIES_FAIL,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    LOAD_CATEGORY_SUCCESS,
    LOAD_CATEGORY_FAIL
} from '../types';

const initialState = {
    create_category: null,
    category: {},
    categories: [],
    category_deleted: false,
    load_category: null,
    loading: true
}

export default function(state = initialState, action){
    const { type, payload } = action;

    switch(type){
        case CREATE_CATEGORY_SUCCESS: 
            return {
                ...state,
                ...payload,
                loading: false
            }
        case GET_CATEGORIES_FAIL:
        case CREATE_CATEGORY_FAIL:
            return {
                ...state,
                categories: []
            }
        case UPDATE_CATEGORY:
        case GET_CATEGORY:
            return {
                ...state,
                category: payload,
                loading: false
            }
        
        case GET_CATEGORIES:
            return {
                ...state,
                categories: payload,
                loading: false
            }
        case LOAD_CATEGORY_SUCCESS:
            return {
                ...state,
                load_category: payload,
                loading: false
            }
        case LOAD_CATEGORY_FAIL:
            return {
                ...state,
                load_category: null,
                loading: false
            }
        case DELETE_CATEGORY_SUCCESS: 
            return {
                ...state,
                category: null,
                category_deleted: true,
                loading: false
            }
        case DELETE_CATEGORY_FAIL:
            return {
                ...state,
                category_deleted: false,
                loading: false
            }
        default:
            return state
    }
}