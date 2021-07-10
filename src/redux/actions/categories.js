import { 
    CREATE_CATEGORY_FAIL, 
    CREATE_CATEGORY_SUCCESS, 
    GET_CATEGORIES, 
    GET_CATEGORY,
    UPDATE_CATEGORY, 
    GET_CATEGORIES_FAIL,
    DELETE_CATEGORY_FAIL,
    DELETE_CATEGORY_SUCCESS
} from '../types';
import axios from 'axios';
import { setAlert } from './alert';

export const CreateCategory = (name) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({name});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API}/category-create`, body, config);
        dispatch({
            type: CREATE_CATEGORY_SUCCESS,
            payload: res.data
        });
        dispatch(setAlert(`Категория успешно создана`, 'success'))
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: CREATE_CATEGORY_FAIL
        })
    }
}

export const GetCurrentCategory = (slug) => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);
        dispatch({
            type: GET_CATEGORY,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            GET_CATEGORIES_FAIL
        })
    }
}

export const GetCategories = () => async dispatch => {
    try {
        let res = await axios.get(`${process.env.REACT_APP_API}/categories`);
        dispatch({
            type: GET_CATEGORIES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            GET_CATEGORIES_FAIL
        })
    }
}

export const CategoryUpdate = (slug) => async dispatch => {
    try {
        const res = await axios.put(`${process.env.REACT_APP_API}/category-update/${slug}`);
        dispatch({
            type: UPDATE_CATEGORY,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            GET_CATEGORIES_FAIL
        })
    }
}

export const DeleteCategory = (slug) => async dispatch => {
    try {
        const res =  await axios.delete(`${process.env.REACT_APP_API}/category-delete/${slug}`);

        dispatch({
            type: DELETE_CATEGORY_SUCCESS,
            payload: res.data
        });
        dispatch(setAlert(`Категория успешно удалена`, 'success'))
    } catch (err) {
        dispatch({type: DELETE_CATEGORY_FAIL})
    }
}