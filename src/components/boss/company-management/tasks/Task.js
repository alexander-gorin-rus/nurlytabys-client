import React, {useState,  useEffect} from 'react';
import PropTypes from 'prop-types';
import {
    CreateTask,
    GetAllTasks
} from '../../../../redux/actions/task';
import { LoadAllRoles } from '../../../../redux/actions/roles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru'
import MonthSelect from './calendar/MonthSelect';
import MonthGrid from './calendar/MonthGrid';
import './calendar/calendar.css'
import WeekGrid from './calendar/WeekGrid';
import WeekSelect from './calendar/WeekSelect';
import DaySelect from './calendar/DaySelect';
import DayGrid from './calendar/DayGrid';

//global constants for calendar
const totalMonthDays = 42

const EmployeeList = ({
    LoadAllRoles,
    CreateTask,
    GetAllTasks,
    roles: {load_all_roles},
    task: {all_tasks}
}) => {

    moment.locale('ru', {week: {dow: 1}});

    //this section is for calendar model
    const [taskUpdate, setTaskUpdate] = useState(null)
    const [isShowForm, setShowForm] = useState(false)

    const [today, setToday] = useState(moment())
    const startMonth = today.clone().startOf('month').startOf('week');
    const endMonth = moment().endOf('month').endOf('week');
    const startWeek = today.clone().startOf('week');
    const endWeek = moment().endOf('week');
    const startDay = today.clone().startOf('day');
    const endDay = moment().endOf('day');

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

    while(!weekDay.isAfter(endWeek)){
        weekCalendar.push(weekDay.clone())
        weekDay.add(1, 'day')
    }

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

    const prevWeek = () => {
        setToday(prev => prev.clone().subtract(1, 'week'));
    }
    const currentWeek = () => {
        setToday(moment())
    }
    const nextWeek = () => {
        setToday(prev => prev.clone().add(1, 'week'));

    }

    const prevDay = () => {
        setToday(prev => prev.clone().subtract(1, 'day'));
    }
    const currentDay = () => {
        setToday(moment())
    }
    const nextDay = () => {
        setToday(prev => prev.clone().add(1, 'day'));

    }

    useEffect(() => {
        GetAllTasks();
        LoadAllRoles();
    },[]);

    const [toggleCalendarGrid, setToggleCalendarGrid] = useState(1)

    const selectCalendarGrid = (index) => {
        setToggleCalendarGrid(index)
    }
    const [checked, setChecked] = useState([]);
    const [values, setValues] = useState({
        title: "",
        content: "",
        role: [],
        finish: ""
       
    });

    const { 
        title,
        content,
        role,
        finish
    } = values;


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

        if(content === ""){
            alert('Необходимо заполнить поле с текстом задания')
        }
        else{
            CreateTask(variables)
            setTimeout(() => {
                setShowForm(false)
            },200)
        }
        
        setValues({
            title,
            content: "",
            role: [],
            finish: ""
        });
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
        setValues({...values, role: newChecked})
}

    const openModalHandler = ( method, taskForUpdate) => {
        setTaskUpdate(taskForUpdate)
        setShowForm(true)
        console.log('onDoudleClick', method)
    }

    const cancelButtonHandler = () => {
        setShowForm(false)
    }
    
    return (
        <div className="main-div-content">
            <div className="calendar-div  my-4">
                <>
                    {
                        isShowForm ? 
                        (
                            <div className='form-position-wrapper'>
                                <form onSubmit={handleSubmit}>
                                <div className="form-group mx-4">
                                        <input
                                            type="text"
                                            name="title"
                                            className="form-control"
                                            value={title}
                                            onChange={handleChange}
                                            placeholder="Название задания"
                                        />
                                    </div>
                                    <div className="form-group mx-4">
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
                                    </ul>
                                    <button className="btn btn-outline-info mt-4">Отправить</button>
                                    <br />
                                    <br />
                                    <button onClick={cancelButtonHandler}  className="btn bg-warning mt-4 text-danger mb-3">Закрыть</button> 
                                    
                                </form>
                            </div>
                        ) 
                            :
                        null
                    }
                    <div className='calendar-select-header'>
                        <p 
                            onClick={() => selectCalendarGrid(1)}
                            className={toggleCalendarGrid === 1 ? 'calendar-header-content calendar-header-active' : 'calendar-header-content'} >День</p>
                        <p 
                            onClick={() => selectCalendarGrid(2)}
                            className={toggleCalendarGrid === 2 ? 'calendar-header-content calendar-header-active' : 'calendar-header-content'}>Неделя</p>
                        <p 
                            onClick={() => selectCalendarGrid(3)}
                            className={toggleCalendarGrid === 3 ? 'calendar-header-content calendar-header-active' : 'calendar-header-content'}>Месяц</p>
                    </div>
                    <div className={toggleCalendarGrid === 1 ? 'calendar-content content-active' : 'calendar-content'}>
                        <DaySelect 
                            prevDay={prevDay}
                            currentDay={currentDay}
                            nextDay={nextDay}
                            today={today}
                        />
                        <DayGrid
                            startDay={startDay}
                            all_tasks={all_tasks}
                            openModalHandler={openModalHandler}
                        />
                    </div>
                    <div className={toggleCalendarGrid === 2 ? 'calendar-content content-active' : 'calendar-content'}>
                        <WeekSelect
                            prevWeek={prevWeek}
                            currentWeek={currentWeek}
                            nextWeek={nextWeek}
                            today={today}
                        />
                        <WeekGrid
                            startWeek={startWeek}
                            all_tasks={all_tasks} 
                            openModalHandler={openModalHandler}
                        />
                    </div>
                    <div className={toggleCalendarGrid === 3 ? 'calendar-content content-active' : 'calendar-content'}>
                        <MonthSelect
                            prevMonth={prevMonth}
                            currentMonth={currentMonth}
                            nextMonth={nextMonth}
                            today={today} 
                        />
                        <MonthGrid
                            startMonth={startMonth} 
                            totalMonthDays={totalMonthDays} 
                            all_tasks={all_tasks} 
                            openModalHandler={openModalHandler}
                        />
                    </div> 
                </>
            </div>
          
            <Link className='d-block p-3 mt-3 bg-warning app-text-small' to='/company-management'>Вернуться на страницу управления компанией</Link>
        </div>
    )
}

EmployeeList.propTypes = {
    LoadAllRoles:PropTypes.func.isRequired,
    CreateTask: PropTypes.func.isRequired,
    GetAllTasks: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    roles: state.roles,
    task: state.task
});

export default connect(mapStateToProps, {
    LoadAllRoles,
    CreateTask,
    GetAllTasks
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
