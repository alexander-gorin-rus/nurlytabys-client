import React from 'react'
import styled from 'styled-components'
import moment from 'moment';


const Calendar = ({
    startDay, 
    today,
    prevMonth,
    currentMonth,
    nextMonth
}) => {

    
    //const moment = moment();
    window.moment = moment;
    const calenderStructure = 42;
    const day = startDay.clone().subtract(1, 'day');
    const daysArray = [...Array(42)].map(() => day.add(1, 'day').clone());

    const CellWrapper = styled.div`
        min-width: 90px;
        min-height: 50px;
        background: ${props => props.isWeekend ? 'green' : '#223ccf'};
        border: 1px solid white;
        margin: 7px 7px 7px 7px;
        border-radius: 5px;

        @media (max-width: 850px) {
              min-width: 60px;
              min-height: 50px;
              margin: 3px;
           
          }

          @media (max-width: 580px) {
            min-width: 30px;
            min-height: 20px;
            margin: 3px;
         
        }

    `

    const isCurrentDay = (day) => moment().isSame(day, 'day');

    return (
        <div className="calendar ">
            <div className="calendar-header">
                header
            </div>
            <div className="calendar-header-content">
                <div>
                    <span className="calendar-header-content-month">
                        <b>
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
            {daysArray.map((d) => (
                <CellWrapper 
                    key={d.format('DD-MM-YYYY')}
                    isWeekend={d.day() === 6 || d.day() === 0}
                    >
                    {
                        !isCurrentDay(d) && d.format('D') ? 
                            (
                                <div>
                                    {d.format('D')}
                                </div> 
                            ) 
                                : 
                            (
                                <div className='calendar-current-day'>
                                    {d.format('D')}
                                </div> 
                            )
                    }
                </CellWrapper>
            ))}
        </div>
        </div>
    )
}

export default Calendar
