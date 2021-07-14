import { 
    LOAD_ALL_VIDEOS,
    UPLOAD_VIDEO_SUCCESS,
    UPLOAD_VIDEO_FAIL,
    DELETE_VIDEO_SUCCESS,
    UPDATE_VIDEO_SUCCESS
} from "../types";
import axios from 'axios';
import { setAlert } from './alert';

export const LoadVideos = () => async dispatch => {
    
    try {
        const res = await axios.get(`${process.env.REACT_APP_API}/get-videos`);
        dispatch({
            type: LOAD_ALL_VIDEOS,
            payload: res.data
        })
    } catch (error) {
        console.log(error);
    }
} 

export const UploadVideoFunction = (variables) => async dispatch => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API}/save-video`, variables)
        dispatch({
            type: UPLOAD_VIDEO_SUCCESS,
            payload: res.data
        })
        dispatch( setAlert('Видео успешно сохранено', 'success'))
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: UPLOAD_VIDEO_FAIL
        })
    }
}

export const DeleteVideo = (slug) => async dispatch => {
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API}/delete-video/${slug}`);
        dispatch({
            type: DELETE_VIDEO_SUCCESS,
            payload: res.data
        })
        dispatch(setAlert(`Видео успешно удалено`, 'success'))
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}

export const UpdateVideo = (slug) => async dispatch => {
    try {
        const res = await axios.put(`${process.env.REACT_APP_API}/update-video/${slug}`);
        dispatch({
            type: UPDATE_VIDEO_SUCCESS,
            payload: res.data
        })
        dispatch(setAlert(`Видео успешно удалено`, 'success'))
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}