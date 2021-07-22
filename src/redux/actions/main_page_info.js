import { 
    MAIN_PAGE_INFO_UPLOAD_FAIL,
    MAIN_PAGE_INFO_UPLOAD_SUCCESS,
    GET_MAIN_PAGE_INFO_FAIL,
    GET_MAIN_PAGE_INFO_SUCCESS,
    GET_MAIN_PAGE_INFO_BY_ID
} from '../types'
import axios from 'axios';
import { setAlert } from './alert';

export const MainPageInfoUpload = (variables) => async dispatch => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API}/main-page-save-video`, variables);
        dispatch({
            payload: res.data,
            type: MAIN_PAGE_INFO_UPLOAD_SUCCESS
        });
        dispatch(setAlert('Информация для главной страницы успешно сохранена', 'success'))
    } catch (err) {
        dispatch({
            type: MAIN_PAGE_INFO_UPLOAD_FAIL
        });
        dispatch(setAlert('Информацию для главной страницы не удалось сохранить', 'danger'))
    }
}

export const MainPageInfoShow = () => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API}/main-page-get-video`);
        dispatch({
            type: GET_MAIN_PAGE_INFO_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_MAIN_PAGE_INFO_FAIL
        })
    }
}

export const MainPageInfoDelete = (slug) => async dispatch => {
    try {
        await axios.delete(`${process.env.REACT_APP_API}/main-page-delete-video/${slug}`);
        dispatch({
            type: GET_MAIN_PAGE_INFO_FAIL,
        });
        dispatch(setAlert('Информация для главной страницы успешно удалена', 'success'));
    } catch (err) {
        dispatch({
            type: GET_MAIN_PAGE_INFO_FAIL
        });
        dispatch(setAlert('Не удалось удалить информацию для главной страницы', 'danger'));
    }
}

export const GetMainPageInfoById = (id) => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API}/main-page-get-info/${id}`);
        dispatch({
            type: GET_MAIN_PAGE_INFO_BY_ID,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_MAIN_PAGE_INFO_FAIL
        })
    }
}

export const UpdateMainPageInfo = () => async dispatch => {
    try {
        
    } catch (err) {
        
    }
}
