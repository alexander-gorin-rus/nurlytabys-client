import { 
    LOAD_ALL_VIDEOS,
    UPLOAD_VIDEO_SUCCESS,
    UPLOAD_VIDEO_FAIL
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