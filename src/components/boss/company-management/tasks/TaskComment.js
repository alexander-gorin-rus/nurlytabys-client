import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import { GetTaskById } from '../../../../redux/actions/task';
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom';

const TaskComment = ({
    GetTaskById,
    task: {task_by_id}
}) => {

    const { id } = useParams();

    useEffect(() => {
        GetTaskById(id)
    },[])
    return (
        <div className='main-div-content'>
            {task_by_id && task_by_id.task.content}
        </div>
    )
}

TaskComment.propTypes = {
    GetTaskById: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    task: state.task
})

export default connect(mapStateToProps, {
    GetTaskById
})(TaskComment)
