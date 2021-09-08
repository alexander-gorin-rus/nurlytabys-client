import React, { useState, useEffect, } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import { GetEmployeeList } from '../../redux/actions/employee_actions'
// import { CreateTask } from '../../redux/actions/task'


const BossPage = ({
    // GetEmployeeList,
    // CreateTask,
    employee_reducer: {
        employee, 
        //employee_list
    },
    
}) => {

    // useEffect(() => {
    //     GetEmployeeList()
    // },[GetEmployeeList]);


    const [displayMyInfo, toggleMyInfo] = useState(false);

    // const [displayTaskForm, toggleTaskForm] = useState(false);
    // const [values, setValues] = useState({
    //     description: "",
    //     employee_name: ""
    // });

    // const { 
    //     description,
    //     employee_name
    // } = values;

    // const handleEmployeeChange = (e) => {
    //     setValues({...values, employee_name: e.target.value})
    // }

    // const handleChange = (e) => {
    //     setValues({...values, [e.target.name]: e.target.value})
    //     //console.log('The choosen employee is', e.target.value)
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault()

    //     const variables = {
    //         description,
    //         employee_name
    //     }

    //     CreateTask(variables)
        
    //     setValues({
    //         description: "",
    //         employee_name: ""
    //     })
    // }


    return (
        <div className='main-div-content'>
            <p className='app-text text-center'>Моя страница</p>
           
            {/* <section>
                <div 
                    className="d-flex justify-content-center bg-success p-3 rounded-2" 
                    style={{cursor: "pointer"}} 
                    onClick={() => toggleTaskForm(!displayTaskForm)}>
                        {displayTaskForm && displayTaskForm ? 
                            (
                                <p>Свернуть</p>
                            )
                                :
                            (
                                <p>Форма заполнения заданий</p>
                            )
                            }
                    </div>
                {displayTaskForm && (
                    <>
                        <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="description"
                                className="form-control"
                                value={description}
                                onChange={handleChange}
                                placeholder="Текст задания"
                            />
                        </div>
                        <select
                            name="employee_name"
                            className="form-control bg-primary text-light"
                            onChange={handleEmployeeChange}
                        >
                            <option>Выбрать сотрудника</option>
                            {employee_list.list && employee_list.list.length > 0 &&
                                employee_list.list.map((l) =>
                                    <option
                                        key={l._id}
                                        value={l._id}
                                    >{l.name}
                                    </option>)
                            }
                        </select>
                        <button className="btn btn-outline-info mt-4">Отправить</button> 
                        </form>
                    </>
                )}
               
            </section>
            
           
            <br />
            <br />
            {employee_list.list && employee_list.list.map((l, index) => 
                (
                    <div className="bg-info" key={index}>
                        {l && l.boss === 1 ? 
                            (
                                null
                            )
                                :
                            (
                                <section style={{cursor: "pointer"}}>
                                     <Link to={`/employee-with-tasks/${l._id}`}>
                                        <p className="text-center">{l.name}</p>
                                        <p className="text-center">{l.lastName}</p>  
                                    </Link>
                                </section>
                               
                            )
                        }
                    </div>
                ))
            }
            */}
           
           <div className="row">
                <div className="col-12">
                    <ul className="list-block">
                        <li className="mt-3 app-text list-block-item bg-warning p-2 rounded-3"><Link to='/company-management'>Управление компанией</Link></li>
                        <li className="mt-3 app-text list-block-item bg-warning p-2 rounded"><Link className="link" to='/site-management'>Управление сайтом</Link></li>
                    </ul>
                    
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
                        <Link to={`/change-staff-info/${employee.employee._id}`} className='bg-warning p-3'>Изменить персональную информацию</Link>
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
    // GetEmployeeList:PropTypes.func.isRequired,
    // CreateTask: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    employee_reducer: state.employee_reducer
})

export default connect(mapStateToProps, {
    // GetEmployeeList,
    // CreateTask
})(BossPage)
