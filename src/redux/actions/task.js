import { 
    CREATE_TASK_SUCCESS,
    CREATE_TASK_FAIL,
    TASK_CHANGE_FAIL,
    TASK_CHANGE_SUCCESS
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

export const ChangeTask = (taskId, completed) => async dispatch => {
    try {
        const res = await axios.put(`${process.env.REACT_APP_API}/task-status`, {taskId, completed})
        dispatch({
            type: TASK_CHANGE_SUCCESS,
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