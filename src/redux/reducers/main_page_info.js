import { 
    MAIN_PAGE_INFO_UPLOAD_SUCCESS,
    MAIN_PAGE_INFO_UPLOAD_FAIL,
    GET_MAIN_PAGE_INFO_FAIL,
    GET_MAIN_PAGE_INFO_SUCCESS,
    GET_MAIN_PAGE_INFO_BY_ID
} from '../types';

const initialState = {
    main_page_info_upload: null,
    main_page_info: {},
    main_page_info_by_id: null,
    loading: true
}

export default function(state = initialState, action){
    const { type, payload } = action;

    switch(type){
        case MAIN_PAGE_INFO_UPLOAD_SUCCESS:
            return {
                ...state,
                main_page_info_upload: payload,
                loading: false
            }
        case MAIN_PAGE_INFO_UPLOAD_FAIL:
            return {
                ...state,
                main_page_info_upload: null,
                loading: false
            }
        case GET_MAIN_PAGE_INFO_SUCCESS:
            return {
                ...state,
                main_page_info: payload,
                loading: false
            }
        case GET_MAIN_PAGE_INFO_FAIL:
            return {
                ...state,
                main_page_info_upload: null,
                loading: false
            }
        case GET_MAIN_PAGE_INFO_BY_ID: 
            return {
                main_page_info_upload: null,
                main_page_info: {},
                main_page_info_by_id: payload,
                loading: false
            }
        default:
            return state
    }

}