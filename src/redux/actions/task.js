import axios from 'axios';

import { 
    CREATE_TASK_SUCCESS,
    CREATE_TASK_FAIL,
    TASK_CHANGE_FAIL,
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
    TASK_COMPLETED_FAIL,
    TASK_READ_FAIL,
    TASK_READ_SUCCESS,
    GET_TASKS_COUNT,
    UPDATE_TASKS_COUNT,
    CREATE_TASKS_COUNT_SUCCESS,
    CREATE_TASKS_COUNT_FAIL,
} from '../types';

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

export const TaskStatusRead = (_id, ok) => async dispatch => {
    try {
        const res = await axios.put(`${process.env.REACT_APP_API}/task-read/${_id}`, ok)
        dispatch({
            type: TASK_READ_SUCCESS,
            payload: res.data
        });
        dispatch(setAlert('Задание отмечено как прочитанное', 'success'))
    } catch (err) {
        dispatch({
            type: TASK_READ_FAIL
        })
        dispatch(setAlert('Не удалось отметить задание как прочитанное', 'danger'))
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
        await axios.delete(`${process.env.REACT_APP_API}/comment/${taskId}/${commentId}`)
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

export const GetTasksCount = (id) => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API}/tasks-count/${id}`);
        dispatch({
            type: GET_TASKS_COUNT,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_TASKS_BY_ROLE_FAIL
        })
    }
}

export const TasksCountCreate = (variables) => async dispatch => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API}/tasks-count-create`, variables);
    dispatch({
        type: CREATE_TASKS_COUNT_SUCCESS,
        payload: res.data
    });
    dispatch(setAlert('Tasks count create success', 'success'))
    } catch (err) {
        dispatch({
        type: CREATE_TASKS_COUNT_FAIL
        });
        dispatch(setAlert('Tasks count create fail', 'danger'))
    }
}

export const TasksCountUpdate = (_id, count) => async dispatch => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API}/task-count-update/${_id}`, count)
        dispatch({
            type: UPDATE_TASKS_COUNT,
            payload: res.data
        });
    setAlert('tasks count number was successfully updated', 'success');
    } catch (err) {
    setAlert('Unable to update tasks number', 'danger');
        
    }
}