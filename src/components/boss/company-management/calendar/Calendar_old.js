import React, {useState} from 'react'
import styled from 'styled-components'
import moment from 'moment';
import { Link } from 'react-router-dom';


const Calendar = ({
    startDay, 
    today,
    prevMonth,
    currentMonth,
    nextMonth,
    business_list
}) => {

    const [dispalySingleDay, toggleSingleDay] = useState(false);
    //const moment = moment();
    window.moment = moment;
    //const calenderStructure = 42;
    const day = startDay.clone().subtract(1, 'day');
    const daysArray = [...Array(42)].map(() => day.add(1, 'day').clone());


    const isCurrentDay = (day) => moment().isSame(day, 'day');

    return (
        <div className="main-div-container">
            <div className="calendar-header">
                header
            </div>
            <div className="calendar-header-content">
                <div>
                    <span className="calendar-header-content-month">
                        <b className="px-2">
                           {today.format('MMMM')}
                        </b>   
                    </span >
                    <span className="calendar-header-content-year">
                        {today.format('YYYY')}
                    </span>
                </div>
                <div className="calendar-buttons-div">
                    <button 
                        className="calendar-header-content-button"
                        onClick={prevMonth}
                        >
                            &lt; 
                    </button>
                    <button 
                        className="calendar-header-content-button"
                        onClick={currentMonth}
                        >
                            Текущий месяц
                    </button>
                    <button 
                        className="calendar-header-content-button"
                        onClick={nextMonth}
                        >
                            &gt; 
                    </button>
                </div>
            </div>
            <div className="calendar-grid">
            {[...Array(7)].map((i, d) => (
                <div key={i} className="calendar-week-days">
                    <p>{moment().day(d + 1).format('dddd')}</p>
                </div>
            ))}
           {
    daysArray.map((d) => (
        <div 
            className='cell-wrapper'
            key={d.format('DD-MM-YYYY')}
            >
                 {d.format('D')}
            </div>
    ))}
        </div>
        </div>
    )
}

export default Calendar

