import { 
    LOAD_ALL_VIDEOS,
    UPLOAD_VIDEO_SUCCESS,
    UPLOAD_VIDEO_FAIL,
    DELETE_VIDEO_SUCCESS,
    GET_SINGLE_VIDEO_FAIL,
    GET_SINGLE_VIDEO_SUCCESS,
    UPDATE_SINGLE_VIDEO_SUCCESS,
    UPDATE_SINGLE_VIDEO_FAIL,
    GET_DETAILED_INFO_SUCCESS,
    GET_DETAILED_INFO_FAIL
} from '../types';

const initialState = {
    video: null,
    videos: [],
    single_video: {},
    updated_video: {},
    detailed_info: {},
    loading: true
}

export default function(state = initialState, action){
    const { type, payload } = action;
    switch(type){
        case LOAD_ALL_VIDEOS:
            return {
                ...state,
                videos: payload,
                loading: false
            }
        case UPLOAD_VIDEO_SUCCESS: 
            return {
                ...state,
                video: payload,
                loading: false
            }
        case UPLOAD_VIDEO_FAIL:
            return {
                ...state,
                video: null,
                loading: false
            }
        case GET_SINGLE_VIDEO_SUCCESS:
            return {
                ...state,
                single_video: payload,
                loading: false
            }
        case GET_SINGLE_VIDEO_FAIL:
            return {
                ...state,
                single_video: {},
                loading: false
            }
        case UPDATE_SINGLE_VIDEO_SUCCESS:
            return {
                ...state,
                updated_video: payload,
                loading: false
            }
        case UPDATE_SINGLE_VIDEO_FAIL:
            return {
                ...state,
                updated_video: {},
                loading: false
            }    
        case DELETE_VIDEO_SUCCESS:
            return {
                ...state,
                video: payload,
                loading: false
            }
        case GET_DETAILED_INFO_SUCCESS:
            return {
                ...state,
                detailed_info: payload,
                loading: false
            }
        case GET_DETAILED_INFO_FAIL:
            return {
                ...state,
                detailed_info: {},
                loading: false
            }
        default: 
            return state
    }
}