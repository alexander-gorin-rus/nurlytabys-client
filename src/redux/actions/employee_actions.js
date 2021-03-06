import axios from 'axios';
import { 
    REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    LOGIN_SUCCESS, 
    //LOGIN_FAIL, 
    EMPLOYEE_LOADED,
    LOGOUT,
    //ACCOUNT_DELETED,
    AUTH_ERROR, 
    CLEAR_PROFILE,
    GET_EMPLOYEE_LIST_SUCCESS,
    GET_EMPLOYEE_LIST_FAIL,
    GET_EMPLOYEE_BY_ID_SUCCESS,
    GET_EMPLOYEE_BY_ID_FAIL,
    UPDATE_EMPLOYEE_FAIL,
    UPDATE_EMPLOYEE_SUCCESS,
    DELETE_EMPLOYEE_SUCCESS,
    DELETE_EMPLOYEE_FAIL,
    GET_EMPLOYEE_WITH_TASKS_SUCCESS,
    GET_EMPLOYEE_WITH_TASKS_FAIL
} from '../types';
import { setAlert} from './alert';

import setAuthToken from '../../utils/setAuthToken';

export const loadEmployee = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    try {
       const res = await axios.get(`${process.env.REACT_APP_API}/auth-employee`);
       
       dispatch({
           type: EMPLOYEE_LOADED,
           payload: res.data
       });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
          });
    }
}

export const loadEmployeeWithTasks = (id) => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API}/get-employee-with-tasks/${id}`);
        dispatch({
            type: GET_EMPLOYEE_WITH_TASKS_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_EMPLOYEE_WITH_TASKS_FAIL
        })
        dispatch(setAlert('Не удалось получить пользователя', 'danger'))
    }
}

export const registerEmployee = ({ name, lastName, password, phone, email }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body =  JSON.stringify({ name, lastName, email, phone, password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API}/register`, body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadEmployee());
        dispatch(setAlert(`Вы успешно зарегистрировались`, 'success'));
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: REGISTER_FAIL
        });
    }
} 

export const loginEmployee = ( email, password ) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body =  JSON.stringify({ email, password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API}/login`, body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadEmployee());
        dispatch(setAlert(`Вы успешно вошли в свой профиль`, 'success'));
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: REGISTER_FAIL
        });
    }
} 

export const logout = () => dispatch => {
    dispatch({
      type: CLEAR_PROFILE
    });
    dispatch({
      type: LOGOUT
    });
  };

export const GetEmployeeList = () => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API}/employee-list`);
        dispatch({
            type: GET_EMPLOYEE_LIST_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_EMPLOYEE_LIST_FAIL
        });
    }
}

export const GetEmployeeById = (id) => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API}/get-employee-by-id/${id}`);
        dispatch({
            type: GET_EMPLOYEE_BY_ID_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_EMPLOYEE_BY_ID_FAIL
        })
    }
}

export const UpdateEmployee = (id, values) => async dispatch => {
    try {
        const res = await axios.put(`${process.env.REACT_APP_API}/update-employee/${id}`, values);
        dispatch({
            type: UPDATE_EMPLOYEE_SUCCESS,
            payload: res.data
        });
        dispatch(setAlert('В персональные данные сотрудника успешно внесены изменения', 'success'));
    } catch (err) {
        dispatch({
            type: UPDATE_EMPLOYEE_FAIL
        });
        dispatch(setAlert('Не удалось изменить персональные данные сотрудника', 'danger'))
    }
}

export const DeleteEmployee = (id) => async dispatch => {
    try {
        await axios.delete(`${process.env.REACT_APP_API}/delete-employee/${id}`);
        dispatch({
            type: DELETE_EMPLOYEE_SUCCESS
        });
        dispatch(setAlert('Работник успешно удален', 'success'));
    } catch (err) {
        dispatch({
            type: DELETE_EMPLOYEE_FAIL
        });
        dispatch(setAlert('Не удалось удалить работника', 'danger'));
    }
}
  
