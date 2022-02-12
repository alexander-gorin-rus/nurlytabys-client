import React, { useState, useEffect } from 'react';

import moment from 'moment';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import DaySelect from '../tasks/calendar/DaySelect';
import MonthSelect from '../tasks/calendar/MonthSelect';
import WeekSelect from '../tasks/calendar/WeekSelect';
import { GetBusinessList, DeleteBusiness, CreateBusiness } from '../../../../redux/actions/business';

import MyBusinessDayGrid from './MyBusinessDayGrid';
import MyBusinessMonthGrid from './MyBusinessMonthGrid';
import MyBusinessWeekGrid from './MyBusinessWeekGrid';

const totalMonthDays = 42

const MyBusiness = ({
    GetBusinessList,
    DeleteBusiness,
    CreateBusiness,
    business: {business_list}
}) => {

    moment.locale('ru', {week: {dow: 1}});

    useEffect(() => {
        GetBusinessList()
    },[GetBusinessList]);


   //this section is for calendar model
   const [isShowForm, setShowForm] = useState(false);

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
    
    const [toggleCalendarGrid, setToggleCalendarGrid] = useState(1)

    const selectCalendarGrid = (index) => {
        setToggleCalendarGrid(index)
    }

    const [values, setValues] = useState({
        content: '',
        finish: ''
    });
    
    const { 
        content, 
        finish 
    } = values;

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })}

    const handleSubmit = (e) => {
        e.preventDefault()

        const variables = {
            content,
            finish
        }

        CreateBusiness(variables)
        
        setValues({
            content: "",
            start: "",
            finish: ""
        });

        setTimeout(() => {
            setShowForm(false)
            GetBusinessList();
        },200);

        
    }

    const openModalHandler = () => {
        setShowForm(true)
    }

    const cancelButtonHandler = () => {
        setShowForm(false)
    }
    
    return (
       <div className='main-div-content'>
           <div className="my-6">
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
                                    <div className="form-group mx-4">
                                        <label>Выбрать дату</label>
                                        <input 
                                            type="datetime-local" 
                                            name='finish'
                                            value={finish}
                                            onChange={e => handleChange(e)}
                                        />
                                    </div>
                                    <div className="form-group mx-4">
                                   
                                    <button className="btn btn-outline-info mt-4">Отправить</button>
                                    <br />
                                    <br />
                                    <button onClick={cancelButtonHandler}  className="btn bg-warning mt-4 text-danger mb-3">Закрыть</button>   
                                    </div>
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
                        <MyBusinessDayGrid
                            startDay={startDay}
                            business_list={business_list}
                            openModalHandler={openModalHandler}
                            DeleteBusiness={DeleteBusiness}
                            GetBusinessList={GetBusinessList}
                        />
                    </div>
                    <div className={toggleCalendarGrid === 2 ? 'calendar-content content-active' : 'calendar-content'}>
                        <WeekSelect
                            prevWeek={prevWeek}
                            currentWeek={currentWeek}
                            nextWeek={nextWeek}
                            today={today}
                        />
                        <MyBusinessWeekGrid
                            startWeek={startWeek}
                            business_list={business_list}
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
                        <MyBusinessMonthGrid
                            startMonth={startMonth} 
                            totalMonthDays={totalMonthDays} 
                            business_list={business_list}
                            openModalHandler={openModalHandler}
                        />
                    </div> 
                </>
           </div>
       </div>
    )
}

MyBusiness.propTypes = {
    GetBusinessList: PropTypes.func.isRequired,
    DeleteBusiness: PropTypes.func.isRequired,
    CreateBusiness: PropTypes.func.isRequired,
    business: PropTypes.object,
}

const mapStateToProps = state => ({
    business: state.business
})

export default connect(mapStateToProps,
    {
        GetBusinessList,
        DeleteBusiness,
        CreateBusiness
    })(MyBusiness)
