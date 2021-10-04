import React, {useState} from 'react'

const CommentForm = ({UpdateTask, taskId}) => {

    const [text, setText] = useState('')
    return (
        <div className='post-form'>
            <form 
                className='form my-1'
                onSubmit={e => {
                    e.preventDefault();
                    UpdateTask(taskId, { text });
                    setText('')
                }}
            >
            <textarea
                name='text'
                placeholder='Напишите комментарий'
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <input type='submit' className='btn btn-dark my-1' value='Отправить' />
            </form>
        </div>
    )
}


export default CommentForm
