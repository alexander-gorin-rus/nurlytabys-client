import React, {useState,  useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import { 
    GetEmployeeList
} from '../../../../redux/actions/employee_actions';
import {
    CreateTask
} from '../../../../redux/actions/task';
import { LoadAllRoles } from '../../../../redux/actions/roles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru'
import CalendarHeader from './calendar/CalendarHeader';
import CalendarSelect from './calendar/CalendarSelect';
import CalendarGrid from './calendar/CalendarGrid';
import './calendar/calendar.css'

const EmployeeList = ({
    GetEmployeeList,
    LoadAllRoles,
    CreateTask,
    employee_reducer: {employee_list},
    roles: {load_all_roles}
}) => {

    moment.locale('ru', {week: {dow: 1}});
    //const today = moment()
    const [today, setToday] = useState(moment())
    const startMonth = today.clone().startOf('month').startOf('week');
    const endMonth = moment().endOf('month').endOf('week');
    const startWeek = moment().startOf('week');
    const endWeek = moment().endOf('week');
    const startDay = moment().startOf('hour').hours();
    const endDay = moment().startOf('hour').hours();

    window.startMonth = startMonth;
    window.endMonth = endMonth;
    window.startWeek = startWeek;
    window.endWeek = endWeek;
    window.startDay = startDay;
    window.endDay = endDay;

    const monthCalendar = [];
    const weekCalendar = [];
    const dayCalendar = [];

    let monthDay = startMonth.clone();
    let weekDay = startWeek.clone();
    let day = startDay;

    while(!monthDay.isAfter(endMonth)){
        monthCalendar.push(monthDay.clone())
        monthDay.add(1, 'day')
    }

    // while(!weekDay.isAfter(endWeek)){
    //     weekCalendar.push(weekDay.clone())
    //     weekDay.add(1, 'day')
    // }

    // while(!day.isAfter(endDay)){
    //     dayCalendar.push(day.clone())
    //     day.add(1, 'hour')
    // }

    
    window.moment = moment;
    window.monthDay = monthDay;
    window.weekDay = weekDay;
    window.day = day;;

    
    const prevMonth = () => {
        setToday(prev => prev.clone().subtract(1, 'month'));
    }
    const currentMonth = () => {
        setToday(moment())
    }
    const nextMonth = () => {
        setToday(prev => prev.clone().add(1, 'month'));

    }

    useEffect(() => {
        GetEmployeeList();
        LoadAllRoles()
    },[GetEmployeeList]);

    const [displayTaskForm, toggleTaskForm] = useState(false);
    const [Role, setRoles] = useState([]);
    const [checked, setChecked] = useState([]);
    const [values, setValues] = useState({
        title: "",
        content: "",
        role: [],
        //employee: "",
        //finish: new Date()
        finish: ""
    });

    const { 
        title,
        content,
        role,
        //employee,
        finish
    } = values;

    const handleEmployeeChange = (e) => {
        setValues({...values, employee: e.target.value})
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })}

    const handleSubmit = (e) => {
        e.preventDefault()

        const variables = {
            title,
            content,
            role,
            finish
        }

        if(content === ''){
            alert('Необходимо заполнить поле с текстом задания')
        }
        else{
            CreateTask(variables)
        }
       
        
        setValues({
            title,
            content: "",
            role: []
        });

        window.location.reload('/tasks')
    }

    const handleToggle = (value) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if(currentIndex === -1){
            newChecked.push(value)
        }else{
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked)
        console.log(newChecked)
        setValues({...values, role: newChecked})
}
    return (
        <div className="main-div-content">
            <div className="calendar-div">
                <CalendarHeader />
                <CalendarSelect 
                    prevMonth={prevMonth}
                    currentMonth={currentMonth}
                    nextMonth={nextMonth}
                    today={today} />
                <CalendarGrid startMonth={startMonth} />
            </div>
            <section>
                <div 
                    className="d-flex justify-content-center bg-success p-3 rounded-2" 
                    style={{cursor: "pointer"}} 
                    onClick={() => toggleTaskForm(!displayTaskForm)}>
                        {displayTaskForm && displayTaskForm ? 
                            (
                                <p className='app-text-small'>Свернуть</p>
                            )
                                :
                            (
                                <p className='app-text-small'>Форма заполнения заданий</p>
                            )
                            }
                    </div>
                {displayTaskForm && (
                    <>
                        <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="content"
                                className="form-control"
                                value={content}
                                onChange={handleChange}
                                placeholder="Текст задания"
                            />
                        </div>
                        <div>
                            <label>Выбрать дату</label>
                            <p className='bg-danger px-1'>Внимание: на этом календаре неделя начинается с воскресенья</p>
                            <input 
                                type="datetime-local" 
                                name='finish'
                                value={finish}
                                onChange={e => handleChange(e)}
                            />
                        </div>
                        <ul>
                            {load_all_roles && load_all_roles.roles.map((r) => (
                                <li key={r._id}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            onChange={() => handleToggle(r._id)}
                                            value={checked.indexOf(r._id === -1)}
                                            className="form-check-input" 
                                        /><span>{r.name}</span>
                                    </label> 
                                </li>
                            ))}
                            {/* <CheckBox loadAllRoles={load_all_roles} /> */}
                        </ul>
                       
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
            <Link className='d-block p-3 mt-4 bg-warning app-text-small' to='/company-management'>Вернуться на страницу управления компанией</Link>
        </div>
    )
}

EmployeeList.propTypes = {
    GetEmployeeList: PropTypes.func.isRequired,
    LoadAllRoles:PropTypes.func.isRequired,
    CreateTask: PropTypes.func.isRequired,
    employee_reducer: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    employee_reducer: state.employee_reducer,
    roles: state.roles
});

export default connect(mapStateToProps, {
    GetEmployeeList,
    LoadAllRoles,
    CreateTask,
})(EmployeeList)











// import React, {useState,  useEffect, Fragment} from 'react';
// import PropTypes from 'prop-types';
// import { 
//     GetEmployeeList
// } from '../../../../redux/actions/employee_actions';
// import {
//     CreateTask
// } from '../../../../redux/actions/task'
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

// const EmployeeList = ({
//     GetEmployeeList,
//     CreateTask,
//     employee_reducer: {employee_list}
// }) => {
    
//     useEffect(() => {
//         GetEmployeeList()
//     },[GetEmployeeList]);

//     const [displayTaskForm, toggleTaskForm] = useState(false);
//     const [values, setValues] = useState({
//         title: "",
//         content: "",
//         employee: "",
//         //finish: new Date()
//         finish: ""
//     });

//     const { 
//         title,
//         content,
//         employee,
//         finish
//     } = values;

//     const handleEmployeeChange = (e) => {
//         setValues({...values, employee: e.target.value})
//     }

//     const handleChange = (e) => {
//         setValues({ ...values, [e.target.name]: e.target.value })}

//     const handleSubmit = (e) => {
//         e.preventDefault()

//         const variables = {
//             title,
//             content,
//             employee,
//             finish
//         }

//         if(content === ''){
//             alert('Необходимо заполнить поле с текстом задания')
//         }
//         // else if(employee === ''){
//         //     alert('Необходимо выбрать сотрудника')
//         // }
//         else{
//             CreateTask(variables)
//         }
       
        
//         setValues({
//             title,
//             content: "",
//             employee: ""
//         })
//     }

//     return (
//         <div className="main-div-content">
//             <section>
//                 <div 
//                     className="d-flex justify-content-center bg-success p-3 rounded-2" 
//                     style={{cursor: "pointer"}} 
//                     onClick={() => toggleTaskForm(!displayTaskForm)}>
//                         {displayTaskForm && displayTaskForm ? 
//                             (
//                                 <p className='app-text-small'>Свернуть</p>
//                             )
//                                 :
//                             (
//                                 <p className='app-text-small'>Форма заполнения заданий</p>
//                             )
//                             }
//                     </div>
//                 {displayTaskForm && (
//                     <>
//                         <form onSubmit={handleSubmit}>
//                         {/* <div className="form-group">
//                             <input
//                                 type="text"
//                                 name="title"
//                                 className="form-control"
//                                 value={title}
//                                 onChange={handleChange}
//                                 placeholder="Заголовок задания"
//                             />
//                         </div> */}
//                         <div className="form-group">
//                             <input
//                                 type="text"
//                                 name="content"
//                                 className="form-control"
//                                 value={content}
//                                 onChange={handleChange}
//                                 placeholder="Текст задания"
//                             />
//                         </div>
//                         <div>
//                             <label>Выбрать дату</label>
//                             <p className='bg-danger px-1'>Внимание: на этом календаре неделя начинается с воскресенья</p>
//                             <input 
//                                 type="datetime-local" 
//                                 name='finish'
//                                 value={finish}
//                                 onChange={e => handleChange(e)}
//                             />
//                         </div>
//                         <select
//                             name="employee"
//                             className="form-control bg-primary text-light"
//                             onChange={handleEmployeeChange}
//                         >
//                             <option>Выбрать сотрудника</option>
//                             {employee_list.list && employee_list.list.length > 0 &&
//                                 employee_list.list.map((l) =>
//                                     <option
//                                         key={l._id}
//                                         value={l._id}
//                                     >{l.name}
//                                     </option>)
//                             }
//                         </select>
//                         <button className="btn btn-outline-info mt-4">Отправить</button> 
//                         </form>
//                     </>
//                 )}
               
//             </section>
            
           
//             <br />
//             <br />
//             {employee_list.list && employee_list.list.map((l, index) => 
//                 (
//                     <div className="bg-info" key={index}>
//                         {l && l.boss === 1 ? 
//                             (
//                                 null
//                             )
//                                 :
//                             (
//                                 <section style={{cursor: "pointer"}}>
//                                      <Link to={`/employee-with-tasks/${l._id}`}>
//                                         <p className="text-center">{l.name}</p>
//                                         <p className="text-center">{l.lastName}</p>  
//                                     </Link>
//                                 </section>
                               
//                             )
//                         }
//                     </div>
//                 ))
//             }
//             <Link className='d-block p-3 mt-4 bg-warning app-text-small' to='/company-management'>Вернуться на страницу управления компанией</Link>
//         </div>
//     )
// }

// EmployeeList.propTypes = {
//     GetEmployeeList: PropTypes.func.isRequired,
//     CreateTask: PropTypes.func.isRequired,
//     employee_reducer: PropTypes.object.isRequired,
// }

// const mapStateToProps = state => ({
//     employee_reducer: state.employee_reducer
// });

// export default connect(mapStateToProps, {
//     GetEmployeeList,
//     CreateTask,
// })(EmployeeList)
