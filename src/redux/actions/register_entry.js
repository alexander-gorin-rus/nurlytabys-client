import axios from 'axios';
import { 
    ENTRY_FAIL, 
    ENTRY_LOADED, 
    ENTRY_SUCCESS, 
    PATH_TO_REGISTER_FAIL,
    PATH_TO_REGISTER_SUCCESS,
    LIST_OF_REGISTERS_FAIL,
    LIST_OF_REGISTERS_SUCCESS,
    DELETE_REGISTER_FAIL,
    DELETE_REGISTER_SUCCESS,
    GET_SINGLE_REGISTER_TO_UPDATE_SUCCESS,
    GET_SINGLE_REGISTER_TO_UPDATE_FAIL,
    UPDATE_REGISTER_SUCCESS,
    UPDATE_REGISTER_FAIL
} from '../types';
import { setAlert } from './alert';
import entryAuthToken from '../../utils/entryAuthToken';

export const CreateAccessToRegister = ( name, password ) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({name, password});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API}/register-entry`, body, config);
        dispatch({
            type: PATH_TO_REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(setAlert('Пароль для входа регистрации сотрудников успешно создан', 'success'))
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PATH_TO_REGISTER_FAIL
        });
    }
}

export const listOfRegisters = () => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API}/register-list`);
        dispatch({
            type: LIST_OF_REGISTERS_SUCCESS,
            payload: res.data 
        })
    } catch (err) {
        dispatch({
            type: LIST_OF_REGISTERS_FAIL
        })
    }
}

export const getSingleRegisterToUpdate = (id) => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API}/get-single-register/${id}`);
        dispatch({
            type: GET_SINGLE_REGISTER_TO_UPDATE_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_SINGLE_REGISTER_TO_UPDATE_FAIL
        })
    }
}

export const UpdateRegister = (id, values) => async dispatch => {
    try {
        const res = await axios.put(`${process.env.REACT_APP_API}/update-register/${id}`, values);
        dispatch({
            type: UPDATE_REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(setAlert('Пароль для регистрации успешно изменен', 'success'));
    } catch (err) {
        dispatch({
            type: UPDATE_REGISTER_FAIL
        });
        dispatch(setAlert('Не удалось изменить пароль для регистрации', 'danger'));
    }
}

export const DeleteRegister = (id) => async dispatch => {
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API}/delete-register/${id}`);
        dispatch({
            type: DELETE_REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(setAlert('Пароль для входа регистрации сотрудников успешно удален', 'success'));
    } catch (err) {
        dispatch({
            type: DELETE_REGISTER_FAIL
        })
        dispatch(setAlert('Не удалось удалить пароль для входа регистрации сотрудников', 'danger'));
    }
}

export const loadEntryToken = () => async dispatch => {
    if(localStorage.entry_token){
        entryAuthToken(localStorage.entry_token)
    }
    try {
        const res = await axios.get(`${process.env.REACT_APP_API}/get-entry`);
        dispatch({
            type: ENTRY_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: ENTRY_FAIL
        });
    }
}

export const grantAccessToRegister = ( name, password ) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({name, password});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API}/confirm-entry`, body, config);
        dispatch({
            type: ENTRY_SUCCESS,
            payload: res.data
        })
        dispatch(loadEntryToken())
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: ENTRY_FAIL
        });
    }
}