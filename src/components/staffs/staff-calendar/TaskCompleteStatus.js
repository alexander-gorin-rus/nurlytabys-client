import React from 'react';
import '../../boss/company-management/tasks/calendar/calendar.css';

const TaskCompleteStatus = ({ complete, employee, task }) => {

    let classes = [];

    if(complete.done === true){
        classes.push('text-green')
    }
    return (
        // <div>
         
        //     {task && task.employee.map((e) => (
        //         <div key={e._id}>{e._id !== employee.employee._id && e._id !== complete.byEmployee && complete.done !== true ? null : (<p className={classes.join(' ')}>Задание выполнено</p>)}</div>
        //     ))}
        //    {/* {employee.employee._id !== complete.byEmployee && complete.done !== true ? (<p>Задание не выполнено</p>) : (<p className={classes.join(' ')}>Задание выполнено</p>)} */}
        // </div>
        <div>
           
            {task && task.employee.map((e) => (
                <>
                <div key={e._id}>
                    {task && task.completed.map((c) => (
                        <div key={c._id}>
                            {e._id === employee.employee._id  &&  c.done === true ? null : (<p>Done</p>) }
                        </div>
                    ))}
                    
                </div>
                </>
            ))}
          
        </div>
    )
}

export default TaskCompleteStatus


