import { 
    MAIN_PAGE_INFO_UPLOAD_FAIL,
    MAIN_PAGE_INFO_UPLOAD_SUCCESS,
    GET_MAIN_PAGE_INFO_FAIL,
    GET_MAIN_PAGE_INFO_SUCCESS,
} from '../types'

import axios from 'axios';

export const MainPageInfoUpload = () => async dispatch => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API}/`)
    } catch (err) {
        
    }
}
