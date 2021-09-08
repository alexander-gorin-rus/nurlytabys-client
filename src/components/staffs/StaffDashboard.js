import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './staff-dashbord.css';


const StaffDashboard = ({
    employee_reducer: {employee}
}) => {

    const [displayMyInfo, toggleMyInfo] = useState(false);


    return (
        <div className="main-div-content">
            <p className='app-text text-center'>Моя страница</p>
            <div className="row">
                <div className="col-12">
                    <p className="app-text text-center bg-warning px-2 py-2">Мои задания</p>
                    {employee && employee.tasks.map((t, index) => (
                        <div className="task-card" key={index}>
                            <p className="task-card-description">{t.description}</p>
                            <br />
                            <p className="app-text-small text-center">Задание задано:</p>
                            <p className="text-center">{t.createdAt.split('T')[0]}</p>
                           
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
    employee_reducer: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    employee_reducer: state.employee_reducer
})

export default connect(
    mapStateToProps, 
    {}
)(StaffDashboard)

