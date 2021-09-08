import './task.css';
const TaskStatus = ({t}) => {

    let classes = [];
    if(t.completed === 'Не выполнено'){
        classes.push('text-red')
    }
    if(t.completed === 'Выполнено'){
        classes.push('text-green')
    }
    return (
        <div className="app-text-small text-center">
            <p className={classes.join(' ')}>{t.completed}</p>
        </div>
    
    )
}

export default TaskStatus
