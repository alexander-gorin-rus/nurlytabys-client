import {
    CREATE_ROLE_SUCCESS,
    CREATE_ROLE_FAIL,
    LOAD_ALL_ROLES_SUCCESS,
    LOAD_ALL_ROLES_FAIL,
    DELETE_ROLE_SUCCESS,
    DELETE_ROLE_FAIL,
    LOAD_ROLE_BY_ID_SUCCESS,
    LOAD_ROLE_BY_ID_FAIL,
    UPDATE_ROLE_SUCCESS,
    UPDATE_ROLE_FAIL
} from '../types';
import axios from 'axios';
import { setAlert } from './alert';

export const CreateRole = (variables) => async dispatch => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API}/create-role`, variables);
    dispatch({
        type: CREATE_ROLE_SUCCESS,
        payload: res.data
    });
    dispatch(setAlert('Роль успешно создана', 'success'))
    } catch (err) {
        dispatch({
            type: CREATE_ROLE_FAIL
        });
        dispatch(setAlert('Не удалось создать роль', 'danger'))
    }
}

export const LoadAllRoles = () => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API}/get-roles`);
        dispatch({
            type: LOAD_ALL_ROLES_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: LOAD_ALL_ROLES_FAIL
        });
    }
}

export const DeleteRole = (id) => async dispatch => {
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API}/delete-role/${id}`);
    dispatch({
        type: DELETE_ROLE_SUCCESS,
        payload: res.data
    });
    dispatch(setAlert('Роль успешно удалена', 'success'));
    } catch (err) {
        dispatch({
            type: DELETE_ROLE_FAIL
        });
        dispatch(setAlert('Не удалось удалить роль', 'danger'));
    }
}

export const LoadRoleById = (id) => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API}/get-role-by-id/${id}`);
        dispatch({
            type: LOAD_ROLE_BY_ID_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: LOAD_ROLE_BY_ID_FAIL
        })
    }
}

export const UpdatedRole = (id, values) => async dispatch => {
    try {
        const res = await axios.put(`${process.env.REACT_APP_API}/update-role/${id}`, values);
        dispatch({
            type: UPDATE_ROLE_SUCCESS,
            payload: res.data
        });
        dispatch(setAlert('Роль успешно изменена', 'success'))
    } catch (err) {
        dispatch({
            type: UPDATE_ROLE_FAIL
        });
        dispatch(setAlert('Не удалось изменить роль', 'danger'))
    }
}