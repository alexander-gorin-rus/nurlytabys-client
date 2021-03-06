import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


const BossPage = ({
    
    employee_reducer: {
        employee, 
       
    },
    
}) => {

    const [displayMyInfo, toggleMyInfo] = useState(false);

    return (
        <div className='main-div-content'>
            <p className='app-text text-center'>Моя страница</p>
           <div className="row">
                <div className="col-12">
                    <ul className="list-block">
                        <li className="mt-3 app-text list-block-item bg-warning p-2 rounded-3"><Link to='/company-management'>Управление компанией</Link></li>
                        <li className="mt-3 app-text list-block-item bg-warning p-2 rounded"><Link className="link" to='/site-management'>Управление сайтом</Link></li>
                    </ul>
                    
                    <section>
                    <span 
                        className="d-flex justify-content-center bg-success p-3 rounded-2" 
                        style={{cursor: "pointer"}} 
                        onClick={() => toggleMyInfo(!displayMyInfo)}>
                            {displayMyInfo && displayMyInfo ? 
                                (
                                    <p className='app-text-small'>Свернуть</p>
                                )
                                    :
                                (
                                    <p className='app-text-small'>Показать мою персональную информацию</p>
                                )
                            }
                    </span>

                         {displayMyInfo && (
                             <>
                        <p className='app-text'>{employee.employee.name}</p>
                        <p className='app-text'>{employee.employee.lastName}</p>
                        <p className='app-text'>{employee.employee.phone}</p>
                        <p className='app-text'>{employee.employee.email}</p>
                        <div>
                        {employee && employee.employee.boss === 1 ? 
                            (
                                <p className='app-text'>Директор</p>
                            ) 
                                : 
                            (
                                null
                            )
                        }
                        </div>
                        <Link to={`/change-staff-info/${employee.employee._id}`} className='bg-warning p-3 app-text-small'>Изменить персональную информацию</Link>
                        </>
                    )}
                   
                    </section>
                   
                </div>
            </div>
        </div>
    )
}

BossPage.propTypes = {
    employee_reducer:PropTypes.object,
}

const mapStateToProps = state => ({
    employee_reducer: state.employee_reducer
})

export default connect(mapStateToProps, {
})(BossPage)
