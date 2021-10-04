import React, {useState} from 'react'

const CommentForm = ({
    UpdateTask, 
    taskId,
    employee
}) => {

    const [comment, setComment] = useState('')
    return (
        <div className='post-form'>
           { employee && employee.employee.boss === 1 ? null : (
                <form 
                className='form my-1'
                onSubmit={e => {
                    e.preventDefault();
                    UpdateTask(taskId, { comment });
                    setComment('')
                }}
            >
            <label className='text-dark'>Напишите комментарий</label>
            <textarea
                name='comment'
                value={comment}
                onChange={e => setComment(e.target.value)}
            />
            <input type='submit' className='btn btn-dark my-1' value='Отправить' />
            </form>
           ) }
        </div>
    )
}


export default CommentForm
