import {
    CREATE_BUSINESS_SUCCESS,
    CREATE_BUSINESS_FAIL,
    GET_BUSINESS_LIST_SUCCESS,
    GET_BUSINESS_LIST_FAIL,
    GET_BUSINESS_BY_ID_SUCCESS,
    GET_BUSINESS_BY_ID_FAIL,
    DELETE_BUSINESS_SUCCESS,
    DELETE_BUSINESS_FAIL
} from '../types';
import axios from 'axios';
import { setAlert } from './alert';

export const CreateBusiness = (variables) => async dispatch => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API}/business-create`, variables);
        dispatch({
            type: CREATE_BUSINESS_SUCCESS,
            payload: res.data
        });
        dispatch(setAlert('Дело успешно создано', 'success'));
    } catch (err) {
        dispatch({
            type: CREATE_BUSINESS_FAIL
        });
        dispatch(setAlert('Не удалось создать дело', 'danger'));
    }
}

export const GetBusinessList = () => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API}/get-all-businesses`);
        dispatch({
            type: GET_BUSINESS_LIST_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_BUSINESS_LIST_FAIL
        });
    }
}

export const GetBusinessById = (id) => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API}/get-business-by-id/${id}`);
        dispatch({
            type: GET_BUSINESS_BY_ID_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            GET_BUSINESS_BY_ID_FAIL
        });
    }
}

export const DeleteBusiness = (id) => async dispatch => {
    try {
        await axios.delete(`${process.env.REACT_APP_API}/delete-business/${id}`);
        dispatch({
            type: DELETE_BUSINESS_SUCCESS
        });
        dispatch(setAlert('Дело успешно удалено', 'success'));
    } catch (err) {
        dispatch({
            type: DELETE_BUSINESS_FAIL
        });
        dispatch(setAlert('Не удалось удалить дело', 'danger'));
    }
}