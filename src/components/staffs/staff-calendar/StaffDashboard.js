import React, { useState, useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import moment from 'moment';

import Spinner from '../../layout/Spinner';
import { 
    GetTasksByEmployee,
    GetTasksCount,
    TasksCountUpdate,
    GetTasksCountById
} from '../../../redux/actions/task';

import StaffDayGrid from './StaffDayGrid';
import StaffDaySelect from './StaffDaySelect';
import StaffMonthGrid from './StaffMontGrid';
import StaffMonthSelect from './StaffMonthSelect';
import StaffWeekGrid from './StaffWeekGrid';
import StaffWeekSelect from './StaffWeekSelect';
import SoundAlert1 from './sound-alert1.mp3';
import { Howl, Howler } from 'howler'

const totalMonthDays = 42

const StaffDashboard = ({
    GetTasksByEmployee,
    GetTasksCount,
    TasksCountUpdate,
    GetTasksCountById,
    employee_reducer: {employee},
    task: {
        tasks_by_role, 
        tasks_count,
        tasks_count_by_id
    }
}) => {

    //The customer (the boss of construction company) wanted me 
    //to make a sound alert when his employee(s) recieve(s) a new task(s) from him.
    //In order to do that I made several steps:
    //The first one is to create a mongo TASKSCOUNT collection that stores tasks_by_role length.
    //This collection is represented as tasks_count in redux-devtools
    //This step is realized in TaskFullInfo component. See line 105 there.

    //The second step is compare number of tasks that the employee has and tasks_count value. 
    //In order to do that I created a variable named "tasksByRoleLength" 
    //that gets a number form backend that represents a tasks length
    const tasksByRoleLength = tasks_by_role.length;
    //If boss gives this employe new task, tasksByRoleLength values increases.
    

    //The third step is to get tasks_count value.
    //In order to do that let's create a variable named tasksCountLength 
    //that represents this value: 
    const tasksCountLength = tasks_count && tasks_count.map(c => c.count);

    //Let's make it as a string:
    const tasksCountStrigify = JSON.stringify(tasksCountLength);

    //The forth step is to get number of signs of tasksCountStrigify variable.
    //To compare correctly tasksByRoleLength and tasks_count values
    //we need to cut "[" "]" from this stringified value.
    const signsLength = tasksCountStrigify.length;

    //The final step is to create variable that gets pure numbers without "[" "]" signs
    let tasksCount = 0;
    //let tasksCount = tasks_count && tasks_count.map(c => c.count);
    console.log(tasksCount)
    
    //Let's cut  "["  "]" if tasks less than 10:
    if (signsLength === 3) {
        tasksCount = tasksCountStrigify.slice(1, 2);
    }

    //Let's cut  "["  "]" if tasks more than 9, but less than 100:
    if (signsLength === 4) {
        tasksCount = tasksCountStrigify.slice(1, 3);
    }

    //Let's cut  "["  "]" if tasks more than 100:
    if (signsLength === 5) {
        tasksCount = tasksCountStrigify.slice(1, 4);
    }    

    console.log(tasksByRoleLength);

    const tasksCountId = tasks_count && tasks_count.map(t => t._id);
    const countsStringify = JSON.stringify(tasksCountId);

    let countId = countsStringify.slice(2, 26);

    // const [values, setValues] = useState({
    //     count: tasks_by_role.length,
    //     employeeId: employee && employee.employee._id
    // });
    // const { count, employeeId } = values;

    // const handleCountChange = e => {
    //     setValues({...values, [e.target.name]: e.target.value})
    // }

    //console.log(count)

    useEffect(() => {
        // if(!GetTasksCountById){
        //     return 0
        // }else{
        //     GetTasksCountById(countId)
        // }
        GetTasksCount(employee && employee.employee._id);
        GetTasksByEmployee(employee && employee.employee._id);
        // const variables = {
        //     count,
        //     employeeId
        // }
        if (tasksByRoleLength < tasksCount) {
            TasksCountUpdate(countId, tasksByRoleLength);
            console.log('Tasks length was updated', tasksByRoleLength)
        }
    },[
        GetTasksByEmployee, 
        employee, 
        GetTasksCount,
        tasksCount
        ])


    useEffect(() => {
        const timer = setInterval(() => {
            GetTasksByEmployee(employee && employee.employee._id);
            return ()=> clearInterval(timer)
        }, 30000);
        
    },[GetTasksByEmployee, employee, TasksCountUpdate])

    //Initiate sound
    Howler.volume(1.0);

    const sound = new Howl({
        src: [SoundAlert1]
    });

    //Let's play sound alert!!!!!
    if(tasksCount < tasksByRoleLength) {
        sound.play()
    }

    moment.locale('ru', {week: {dow: 1}});

    //this section is for calendar modal
    const [isShowForm, setShowForm] = useState(false);
    const [today, setToday] = useState(moment());
    

    //calendar section
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
    window.day = day;

    
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
    
    const openModalHandler = () => {
        setShowForm(true)
    }

    const [open, setOpen] = useState(0)

    const [toggleCalendarGrid, setToggleCalendarGrid] = useState(1)

    const selectCalendarGrid = (index) => {
        setToggleCalendarGrid(index)
    }

   
    const [displayMyInfo, toggleMyInfo] = useState(false);


    return (
        <>
        {/* <form 
         //onSubmit={handleReadSubmit}
        >
                   
                       
            <input 
                type="number"
                name="count"
                value={count}
                onChange={handleCountChange}
            />
               
                <button className="btn btn-outline-info mt-4">Отправить</button> 
            </form> 
            */}
            {tasks_by_role && tasks_by_role.tasks ? 
                (
                    <>
                    <div className='main-div-content'>
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
                        <StaffDaySelect 
                            prevDay={prevDay}
                            currentDay={currentDay}
                            nextDay={nextDay}
                            today={today}
                        />
                        <StaffDayGrid
                            startDay={startDay}
                            tasks_by_role={tasks_by_role}
                            openModalHandler={openModalHandler}
                            employee={employee}
                            setOpen={setOpen}
                            open={open}
                        />
                    </div>
                    <div className={toggleCalendarGrid === 2 ? 'calendar-content content-active' : 'calendar-content'}>
                        <StaffWeekSelect
                            prevWeek={prevWeek}
                            currentWeek={currentWeek}
                            nextWeek={nextWeek}
                            today={today}
                        />
                        <StaffWeekGrid
                            startWeek={startWeek}
                            tasks_by_role={tasks_by_role} 
                            openModalHandler={openModalHandler}
                            employee={employee}
                        />
                    </div>
                    <div className={toggleCalendarGrid === 3 ? 'calendar-content content-active' : 'calendar-content'}>
                        <StaffMonthSelect
                            prevMonth={prevMonth}
                            currentMonth={currentMonth}
                            nextMonth={nextMonth}
                            today={today} 
                        />
                        <StaffMonthGrid
                            startMonth={startMonth} 
                            totalMonthDays={totalMonthDays} 
                            tasks_by_role={tasks_by_role} 
                            openModalHandler={openModalHandler}
                            employee={employee}
                        />
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
                                     <p className='app-text-small'>Свернуть</p>
                                 )
                                     :
                                 (
                                     <p className='app-text-small'>Показать мою персональную информацию</p>
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
                    :
                (
                    <Spinner />
                )
            }
        </>
    )
}

StaffDashboard.propTypes = {
    GetTasksByEmployee: PropTypes.func.isRequired,
    GetTasksCount: PropTypes.func.isRequired,
    TasksCountUpdate: PropTypes.func.isRequired,
    GetTasksCountById: PropTypes.func.isRequired,
    business: PropTypes.object,
    employee_reducer:PropTypes.object,
    tasks_count_by_id:PropTypes.object,
}

const mapStateToProps = state => ({
    business: state.business,
    employee_reducer: state.employee_reducer,
    task: state.task
})

export default connect(mapStateToProps,
    {
        GetTasksByEmployee,
        GetTasksCount,
        TasksCountUpdate,
        GetTasksCountById
    })(StaffDashboard)