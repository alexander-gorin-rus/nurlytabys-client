import React from 'react'

const StaffWeekSelect = ({ 
    today,
    prevWeek,
    currentWeek,
    nextWeek
}) => {

    console.log(prevWeek)
    return (
        <div className='calendar-select-div'>
            <div>
                <span className='calendar-select-texts text-bold'>{today.format('MMMM')}</span>
                <span className='calendar-select-texts'>{today.format('YYYY')}</span>
            </div>
            <div className='calendar-select-buttons-wrapper'>
                <button onClick={prevWeek} className="calendar-select-button"> &lt; </button>
                <button onClick={currentWeek} className="calendar-select-button today">текущая неделя</button>
                <button onClick={nextWeek} className="calendar-select-button"> &gt; </button>
            </div>
        </div>
    )
}

export default StaffWeekSelect
