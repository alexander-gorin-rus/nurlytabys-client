import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TaskStatus from '../boss/company-management/tasks/TaskStatus';
import { 
    ChangeTaskStatus,
} from '../../redux/actions/task';


const StaffDashboard = ({
    ChangeTaskStatus,
    employee_reducer: {employee}
}) => {
    
    const handleStatusChange = (taskId, completed) => {
        ChangeTaskStatus(taskId, completed);
        setTimeout(() => {
            window.location.reload()
        },2000)
    }

    
            
    const [displayMyInfo, toggleMyInfo] = useState(false);

    let dayOptions = {weekday: 'long'}
    
    return (
        <>
        <div className='main-div-content'>
            <div className="row">
                <div className="col-12">
                    <p className="app-text text-center bg-warning px-2 py-2">Мои задания</p>
                    {employee && employee.tasks.map((t, index) => (
                        <>
                        <div className="task-card" key={index}>
                            <p className="task-card-description">{t.content}</p>
                            <div className='employee-task-card-content'>
                                <p className="app-text-small d-inline mx-1">Задание задано в:</p>
                                <p className="d-inline mx-1">{new Date(t.createdAt).toLocaleTimeString('ru', dayOptions).split(' ')[0]}</p>
                                <p className="d-inline mx-1">{new Date(t.createdAt).toLocaleString('ru')}</p>
                                <br />
                                <p className="app-text-small d-inline mx-1">Выполнить к:</p>
                                <p className="d-inline mx-1">{new Date(t.finish).toLocaleTimeString('ru', dayOptions).split(' ')[0]}</p>
                                <p className="d-inline mx-1">{new Date(t.finish).toLocaleString('ru')}</p>
                            </div>
                            <Link 
                                className='app-text-small my-4 mx-2 bg-warning p-1' 
                                to={`/task-comment/${t._id}`}  
                            >
                                    Написать комментарий к заданию
                            </Link>
                             <p className="app-text-small text-center mt-2">Статус задания</p>
                             <TaskStatus t={t} />
                           
                             <div>
                             <p className="app-text-small text-center bg-warning">Изменить статус задания</p>
                             <select
                                onChange={(e) => handleStatusChange(t._id, e.target.value)}
                                className="form-control"
                                name="completed"
                                defaultValue={t.completed}
                            >
                                 <option value="Не выполнено">Не выполнено</option>
                                 <option value="Выполнено">Выполнено</option>
                            </select>
                            </div>
                        </div>
                       
                        </>
                     ))}
                </div>
            </div>
        </div>
        <div className="main-div-content">
                 <section>
                     <div 
                         className="d-flex justify-content-center bg-success p-3 rounded-2" 
                        style={{cursor: "pointer"}} 
                         onClick={() => toggleMyInfo(!displayMyInfo)}>
                             {displayMyInfo && displayMyInfo ? 
                                 (
                                     <p>Свернуть</p>
                                 )
                                     :
                                 (
                                     <p>Показать мою персональную информацию</p>
                                 )
                             }
                     </div>
                          {displayMyInfo && (
                              <>
                         <p className='app-text'>{employee.employee.name}</p>
                         <p className='app-text'>{employee.employee.lastName}</p>
                         <p className='app-text'>{employee.employee.phone}</p>
                         <p className='app-text'>{employee.employee.email}</p>
                         <div>
                         {employee && !employee.employee.role ? 
                             (
                                 null
                             ) 
                                 : 
                             (
                                 <p className='app-text'>{employee.employee.role.name}</p>
                             )
                         }
                         </div>
                         <Link to={`/change-staff-info/${employee.employee._id}`} className='bg-warning p-3'>Изменить персональную информацию</Link>
                         </>
                     )}
                   
                     </section>
                </div>
        </>
    )
}

StaffDashboard.propTypes = {
    ChangeTaskStatus: PropTypes.func.isRequired,
    business: PropTypes.object,
    employee_reducer:PropTypes.object,
}

const mapStateToProps = state => ({
    business: state.business,
    employee_reducer: state.employee_reducer
})

export default connect(mapStateToProps,
    {
        ChangeTaskStatus
    })(StaffDashboard)