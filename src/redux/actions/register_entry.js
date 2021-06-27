import axios from 'axios';
import { ENTRY_FAIL, ENTRY_LOADED, ENTRY_SUCCESS } from '../types';
import { setAlert } from './alert';
import entryAuthToken from '../../utils/entryAuthToken';

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