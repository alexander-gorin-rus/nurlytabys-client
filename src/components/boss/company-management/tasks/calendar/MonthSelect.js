import React from 'react'

const MonthSelect = ({ 
    today,
    prevMonth,
    currentMonth,
    nextMonth
}) => {

    return (
        <div className='calendar-select-div'>
            <div>
                <span className='calendar-select-texts text-bold'>{today.format('MMMM')}</span>
                <span className='calendar-select-texts'>{today.format('YYYY')}</span>
            </div>
            <div className='calendar-select-buttons-wrapper'>
                <button onClick={prevMonth} className="calendar-select-button"> &lt; </button>
                <button onClick={currentMonth} className="calendar-select-button today">текущий месяц</button>
                <button onClick={nextMonth} className="calendar-select-button"> &gt; </button>
            </div>
        </div>
    )
}

export default MonthSelect
