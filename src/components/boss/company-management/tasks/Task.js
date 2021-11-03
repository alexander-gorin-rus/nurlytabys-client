import React, {useState,  useEffect} from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import moment from 'moment';

import { GetEmployeeList } from '../../../../redux/actions/employee_actions';
import {
    CreateTask,
    GetAllTasks
} from '../../../../redux/actions/task';

import DayGrid from './calendar/DayGrid';
import DaySelect from './calendar/DaySelect';
import MonthGrid from './calendar/MonthGrid';
import MonthSelect from './calendar/MonthSelect';
import WeekGrid from './calendar/WeekGrid';
import WeekSelect from './calendar/WeekSelect';

//global constants for calendar
const totalMonthDays = 42

const EmployeeList = ({
    GetEmployeeList,
    CreateTask,
    GetAllTasks,
    task: {all_tasks},
    employee_reducer: {employee_list}
}) => {

    moment.locale('ru', {week: {dow: 1}});

    //this section is for calendar model
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
        GetEmployeeList()
    },[GetEmployeeList]);

    useEffect(() => {
        GetAllTasks();
    },[GetAllTasks])

    const [toggleCalendarGrid, setToggleCalendarGrid] = useState(1)

    const selectCalendarGrid = (index) => {
        setToggleCalendarGrid(index)
    }
    const [checked, setChecked] = useState([]);
    const [values, setValues] = useState({
        content: "",
        employee: [],
        finish: ""
       
    });

    const { 
        content,
        employee,
        finish
    } = values;


    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })}


    const handleSubmit = (e) => {
        e.preventDefault()

        const variables = {
            content,
            employee,
            finish
        }

        if(content === ""){
            alert('Необходимо заполнить поле с текстом задания');
        } else if (employee === '') {
            alert('Необходимо выбрать сотрудника');
        }
        else{
            CreateTask(variables)
            setTimeout(() => {
                setShowForm(false)
            },200)
        }
        
        setValues({
            content: "",
            employee: [],
            finish: ""
        });

        setTimeout(() => {
            GetAllTasks()
        },300)
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
        setValues({...values, employee: newChecked})
}

    const openModalHandler = () => {
        setShowForm(true)
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
                                        {employee_list && employee_list.list.map((l) => (
                                            <li key={l._id}>
                                                <label>
                                                    {l && l.boss === 1 ? null : (
                                                        <input
                                                        type="checkbox"
                                                        onChange={() => handleToggle(l._id)}
                                                        value={checked.indexOf(l._id === -1)}
                                                        className="form-check-input" 
                                                    />
                                                    )}
                                                    <span className='mx-2 text-dark'>{!l.role ? null : l.role.name}</span>
                                                    <span className='text-dark'>{l.boss === 1 ? null : l.name}</span>
                                                    <span className='mx-2 text-dark'>{l.boss === 1 ? null : l.lastName}</span>
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
    CreateTask: PropTypes.func.isRequired,
    GetAllTasks: PropTypes.func.isRequired,
    GetEmployeeList: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    task: state.task,
    employee_reducer: state.employee_reducer
});

export default connect(mapStateToProps, {
    CreateTask,
    GetAllTasks,
    GetEmployeeList
})(EmployeeList)