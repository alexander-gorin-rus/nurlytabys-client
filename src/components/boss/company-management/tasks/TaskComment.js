import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { GetTaskById, UpdateTask } from '../../../../redux/actions/task';
import { connect } from 'react-redux'
import { useParams, Link, useHistory  } from 'react-router-dom';


const TaskComment = ({
    GetTaskById,
    UpdateTask,
    task: {task_by_id, loading}
}) => {

    const { id } = useParams();
    const history = useHistory();

    const [values, setValues] = useState({
        feedback: ''
    });

    const {feedback} = values;

    useEffect(() => {
        GetTaskById(id) 
    },[]);

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const variables = {
            feedback
        };
        UpdateTask(id, variables);
        setTimeout(() => {
            history.push('/employee-dashboard');
        },300)
    }

    useEffect(() => {
       const timer = setTimeout(() => {
            setValues({
                feedback: task_by_id.task.feedback
            })
       }, 300);
       return () => clearTimeout(timer)
    },[loading || task_by_id.task.feedback])

    return (
        <div className='main-div-content'>
            <div className='task-card' style={{height: '80vh', paddingTop: "5vh"}}>
                <p className='app-text-small'>
                    {task_by_id && task_by_id.task.content}
                </p>
            
            <form className="col s12" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            style={{height: '50vh', overflowX: 'scroll'}}
                            type="textarea"
                            name="feedback"
                            className="form-control"
                            value={feedback}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <input type='submit' className='btn btn-primary' value='Отправить'/>
                    <Link className='d-block p-3 mt-4 bg-warning ' to='/employee-dashboard'>Вернуться на мою страницу</Link>
                </form>
            </div>
        </div>
    )
}

TaskComment.propTypes = {
    GetTaskById: PropTypes.func.isRequired,
    UpdateTask: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    task: state.task
})

export default connect(mapStateToProps, {
    GetTaskById,
    UpdateTask
})(TaskComment)
