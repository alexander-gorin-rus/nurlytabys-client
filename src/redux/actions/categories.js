import { 
    CREATE_CATEGORY_FAIL, 
    CREATE_CATEGORY_SUCCESS, 
    GET_CATEGORIES, 
    GET_CATEGORY,
    UPDATE_CATEGORY, 
    GET_CATEGORIES_FAIL,
    DELETE_CATEGORY_FAIL,
    DELETE_CATEGORY_SUCCESS,
    LOAD_CATEGORY_SUCCESS,
    LOAD_CATEGORY_FAIL
} from '../types';
import axios from 'axios';
import { setAlert } from './alert';

export const CreateCategory = (variables) => async dispatch => {
        
    try {
        const res = await axios.post(`${process.env.REACT_APP_API}/category-create`, variables);
        dispatch({
            type: CREATE_CATEGORY_SUCCESS,
            payload: res.data
        });
        dispatch(setAlert('Категория успешно сохранена', 'success'))
    } catch (err) {
        dispatch({
            type: CREATE_CATEGORY_FAIL
        });
        dispatch(setAlert('Катерогию не удалось сохранить', 'danger'))
    }
}

// export const CreateCategory = (name, description) => async dispatch => {
//     const config = {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }

//     const body = JSON.stringify({name, description});

//     try {
//         const res = await axios.post(`${process.env.REACT_APP_API}/category-create`, body, config);
//         dispatch({
//             type: CREATE_CATEGORY_SUCCESS,
//             payload: res.data
//         });
//         dispatch(setAlert(`Категория успешно создана`, 'success'))
//     } catch (err) {
//         const errors = err.response.data.errors;

//         if(errors){
//             errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
//         }
//         dispatch({
//             type: CREATE_CATEGORY_FAIL
//         })
//     }
// }

export const GetCategories = () => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API}/categories`);
        dispatch({
            type: GET_CATEGORIES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_CATEGORIES_FAIL
        })
    }
}

export const GetOneCategory = (slug) => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);
        dispatch({
            type: LOAD_CATEGORY_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: LOAD_CATEGORY_FAIL
        })
    }        
}

export const GetOneCategoryToUpdate = (id) => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API}/get-category-to-update/${id}`);
        dispatch({
            type: GET_CATEGORY,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: LOAD_CATEGORY_FAIL
        })
    }
}

export const CategoryUpdate = (id, values) => async dispatch => {
    try {
        const res = await axios.put(`${process.env.REACT_APP_API}/category-update/${id}`, values);
        dispatch({
            type: UPDATE_CATEGORY,
            payload: res.data
        });
        dispatch(setAlert(`Категория успешно изменена`, 'success'))
    } catch (err) {
        dispatch({
            type: GET_CATEGORIES_FAIL
        })
    }
}

export const DeleteCategory = (slug) => async dispatch => {
    try {
        await axios.delete(`${process.env.REACT_APP_API}/category-delete/${slug}`);

        dispatch({
            type: DELETE_CATEGORY_SUCCESS
        });
        dispatch(setAlert(`Категория успешно удалена`, 'success'));
        // dispatch({
        //     type: GET_CATEGORIES
        // })
    } catch (err) {
        dispatch({type: DELETE_CATEGORY_FAIL})
    }
}