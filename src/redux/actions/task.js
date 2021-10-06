import { 
    CREATE_TASK_SUCCESS,
    CREATE_TASK_FAIL,
    TASK_CHANGE_FAIL,
    TASK_CHANGE_STATUS_SUCCESS,
    TASK_CHANGE_SUCCESS,
    TASK_DELETE_FAIL,
    TASK_DELETE_SUCCESS,
    GET_TASK_BY_ID_FAIL,
    GET_TASK_BY_ID_SUCCESS,
    GET_ALL_TASKS_SUCCESS,
    GET_ALL_TASKS_FAIL,
    GET_TASKS_BY_ROLE_SUCCESS,
    GET_TASKS_BY_ROLE_FAIL,
    ADD_TASK_COMMENT,
    REMOVE_TASK_COMMENT,
    TASK_COMPLETED_SUCCESS,
    TASK_COMPLETED_FAIL
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

export const TaskStatusCompleted = (taskId, done) => async dispatch => {
    try {
        const res = await axios.put(`${process.env.REACT_APP_API}/task-completed/${taskId}`, done)
        dispatch({
            type: TASK_COMPLETED_SUCCESS,
            payload: res.data
        });
        dispatch(setAlert('Статус задания успешно изменен', 'success'))
    } catch (err) {
        dispatch({
            type: TASK_COMPLETED_FAIL
        })
        dispatch(setAlert('Не удалось изменить статус задания', 'danger'))
    }
}

export const UpdateTask = (taskId, formData) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`${process.env.REACT_APP_API}/task-update/comment/${taskId}`, formData, config )
        dispatch({
            type: ADD_TASK_COMMENT,
            payload: res.data
        });
        dispatch(setAlert('В задание успешно внесены изменения', 'success'))
    } catch (err) {
        dispatch({
            type: TASK_CHANGE_FAIL
        })
        dispatch(setAlert('Не удалось внести изменения в задание', 'danger'))
    }
}

export const DeleteComment = (taskId, commentId) => async dispatch => {

    try {
        const res = await axios.delete(`${process.env.REACT_APP_API}/comment/${taskId}/${commentId}`)
        dispatch({
            type: REMOVE_TASK_COMMENT,
            payload: commentId
        });
        dispatch(setAlert('Комментарий к заданию успешно удален', 'success'))
    } catch (err) {
        dispatch({
            type: TASK_CHANGE_FAIL
        })
        dispatch(setAlert('Не удалось удалить комментарий', 'danger'))
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

export const GetAllTasks = () => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API}/get-all-tasks`);
        dispatch({
            type: GET_ALL_TASKS_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: GET_ALL_TASKS_FAIL
        })
    }
}

// export const GetTasksByRole = (id) => async dispatch => {
//     try {
//         const res = await axios.get(`${process.env.REACT_APP_API}/get-tasks-by-role/${id}`);
//         dispatch({
//             type: GET_TASKS_BY_ROLE_SUCCESS,
//             payload: res.data
//         })
//     } catch (err) {
//         dispatch({
//             type: GET_TASKS_BY_ROLE_FAIL
//         })
//     }
// }

export const GetTasksByEmployee = (id) => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API}/get-tasks-by-employee/${id}`);
        dispatch({
            type: GET_TASKS_BY_ROLE_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_TASKS_BY_ROLE_FAIL
        })
    }
}