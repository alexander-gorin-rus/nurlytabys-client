import { 
    CREATE_TASK_SUCCESS,
    CREATE_TASK_FAIL,
    TASK_CHANGE_FAIL,
    TASK_CHANGE_STATUS_SUCCESS,
    TASK_CHANGE_SUCCESS,
    TASK_DELETE_FAIL,
    TASK_DELETE_SUCCESS,
    GET_TASK_BY_ID_FAIL,
    GET_TASK_BY_ID_SUCCESS
} from '../types';
import axios from 'axios';
import { setAlert } from './alert';



export const CreateTask = (variables) => async dispatch => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API}/create-task`, variables);
        dispatch({
            type: CREATE_TASK_SUCCESS,
            payload: res.data
        });
        dispatch(setAlert('Задание успешно создано', 'success'))
    } catch (err) {
        dispatch({
            type: CREATE_TASK_FAIL
        });
        dispatch(setAlert('Не удалось создать задание', 'danger'))
    }
}

export const ChangeTaskStatus = (taskId, completed) => async dispatch => {
    try {
        const res = await axios.put(`${process.env.REACT_APP_API}/task-status`, {taskId, completed})
        dispatch({
            type: TASK_CHANGE_STATUS_SUCCESS,
            payload: res.data
        });
        dispatch(setAlert('Статус задания успешно изменен', 'success'))
    } catch (err) {
        dispatch({
            type: TASK_CHANGE_FAIL
        })
        dispatch(setAlert('Не удалось изменить статус задания', 'danger'))
    }
}

export const UpdateTask = (taskId, values) => async dispatch => {
    try {
        const res = await axios.put(`${process.env.REACT_APP_API}/update-task/${taskId}`, values)
        dispatch({
            type: TASK_CHANGE_SUCCESS,
            payload: res.data
        });
        dispatch(setAlert('Комментарий заданию успешно добавлен', 'success'))
    } catch (err) {
        dispatch({
            type: TASK_CHANGE_FAIL
        })
        dispatch(setAlert('Не удалось добавить комментарий к заданию', 'danger'))
    }
}

export const GetTaskById = (id) => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API}/get-task/${id}`);
        dispatch({
            type: GET_TASK_BY_ID_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_TASK_BY_ID_FAIL
        })
    }
}

export const DeleteTask = (id) => async dispatch => {
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API}/delete-task/${id}`);
        dispatch({
            type: TASK_DELETE_SUCCESS,
            payload: res.data
        });
    dispatch(setAlert('Задание успешно удалено', 'success'));
    } catch (err) {
        dispatch({
            type: TASK_DELETE_FAIL
        });
        dispatch(setAlert('Не удалось удалить задание', 'danger'));
    }
}