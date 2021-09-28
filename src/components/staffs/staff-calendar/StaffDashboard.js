import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TaskStatus from '../../boss/company-management/tasks/TaskStatus';
import { 
    ChangeTaskStatus,
    GetTasksByRole
} from '../../../redux/actions/task';
import MonthGrid from '../../boss/company-management/tasks/calendar/MonthGrid';
import MonthSelect from '../../boss/company-management/tasks/calendar/MonthSelect';
import moment from 'moment';
import 'moment/locale/ru'
import StaffMonthGrid from './StaffMontGrid';
import StaffMonthSelect from './StaffMonthSelect';

const totalMonthDays = 42

const StaffDashboard = ({
    ChangeTaskStatus,
    GetTasksByRole,
    employee_reducer: {employee},
    task: {tasks_by_role}
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
    
    const openModalHandler = ( method, taskForUpdate) => {
        setTaskUpdate(taskForUpdate)
        setShowForm(true)
        console.log('onDoudleClick', method)
    }

    const cancelButtonHandler = () => {
        setShowForm(false)
    }

    useEffect(() => {
        GetTasksByRole(employee && employee.employee.role._id)
    },[])

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
            />
               
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
}

StaffDashboard.propTypes = {
    ChangeTaskStatus: PropTypes.func.isRequired,
    GetTasksByRole: PropTypes.func.isRequired,
    business: PropTypes.object,
    employee_reducer:PropTypes.object,
}

const mapStateToProps = state => ({
    business: state.business,
    employee_reducer: state.employee_reducer,
    task: state.task
})

export default connect(mapStateToProps,
    {
        ChangeTaskStatus,
        GetTasksByRole
    })(StaffDashboard)