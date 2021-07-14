import { 
    LOAD_ALL_VIDEOS,
    UPLOAD_VIDEO_SUCCESS,
    UPLOAD_VIDEO_FAIL
} from '../types';

const initialState = {
    video: null,
    videos: [],
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
        case UPLOAD_VIDEO_SUCCESS: {
            return {
                ...state,
                video: payload,
                loading: false
            }
        }
        case UPLOAD_VIDEO_FAIL: {
            return {
                ...state,
                video: null,
                loading: false
            }
        }
        default: 
            return state
    }
}