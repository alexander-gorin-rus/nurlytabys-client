import React from 'react'

const CalendarSelect = ({ today }) => {
    return (
        <div className='calendar-select-div'>
            <div>
                <span className='calendar-select-texts text-bold'>{today.format('MMMM')}</span>
                <span className='calendar-select-texts'>{today.format('YYYY')}</span>
            </div>
            <div className='calendar-select-buttons-wrapper'>
                <button className="calendar-select-button"> &lt; </button>
                <button className="calendar-select-button today">today</button>
                <button className="calendar-select-button"> &gt; </button>
            </div>
        </div>
    )
}

export default CalendarSelect
