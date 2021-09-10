import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './staff-dashbord.css';
import { ChangeTask } from '../../redux/actions/task';
import TaskStatus from '../boss/company-management/tasks/TaskStatus';
import axios from 'axios'


const StaffDashboard = ({
    ChangeTask,
    employee_reducer: {employee}
}) => {

    useEffect(() => {
        ShowTasksList()
    },[])

    const [displayMyInfo, toggleMyInfo] = useState(false);

    const handleStatusChange = (taskId, completed) => {
        ChangeTask(taskId, completed);
        setTimeout(() => {
            window.location.reload()
        },2000)
    }


    const [event, setEvent] = useState([])

    const ShowTasksList = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_API}/get-all-tasks/${employee.employee._id}`)
                .then(res => {
                    //setEvent(res.data)
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="main-div-content">
            <p className='app-text text-center'>Моя страница</p>
            <div>Id of employee is: {employee && employee.employee._id}</div>
            <div className="row">
                <div className="col-12">
                    <p className="app-text text-center bg-warning px-2 py-2">Мои задания</p>
                    {employee && employee.tasks.map((t, index) => (
                        <div className="task-card" key={index}>
                            <p className="task-card-description">{t.description}</p>
                            <br />
                            <p className="app-text-small text-center">Задание задано:</p>
                            <p className="text-center">{new Date(t.createdAt).toLocaleString('en-GB')}</p>
                            <p className="app-text-small text-center">Задание необходимо закончить:</p>
                            <p className="text-center">{new Date(t.finish).toLocaleString('en-GB')}</p>
                            <p className="app-text-small text-center">Статус задания</p>
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
                    ))}
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                
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
            </div>
            
        </div>
    )
}

StaffDashboard.propTypes = {
    ChangeTask: PropTypes.func.isRequired,
    employee_reducer: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    employee_reducer: state.employee_reducer
})

export default connect(
    mapStateToProps, {
        ChangeTask
}
)(StaffDashboard)

