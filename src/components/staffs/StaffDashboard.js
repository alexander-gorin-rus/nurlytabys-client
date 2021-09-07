import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const StaffDashboard = ({
    employee_reducer: {employee}
}) => {

    const [displayMyInfo, toggleMyInfo] = useState(false);


    return (
        <div className="main-div-content">
            <p className='app-text text-center'>Моя страница</p>
            <div className="row">
                <div className="col-12">
                <section>
                    <p 
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
                    </p>

                         {displayMyInfo && (
                             <>
                        <p className='app-text'>{employee.name}</p>
                        <p className='app-text'>{employee.lastName}</p>
                        <p className='app-text'>{employee.phone}</p>
                        <p className='app-text'>{employee.email}</p>
                        <div>
                        {employee && !employee.role ? 
                            (
                                null
                            ) 
                                : 
                            (
                                <p className='app-text'>{employee.role.name}</p>
                            )
                        }
                        </div>
                        <Link to={`/change-staff-info/${employee._id}`} className='bg-warning p-3'>Изменить персональную информацию</Link>
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