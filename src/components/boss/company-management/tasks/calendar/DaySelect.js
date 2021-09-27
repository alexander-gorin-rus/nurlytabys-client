import React from 'react'

const DaySelect = ({ 
    today,
    prevDay,
    currentDay,
    nextDay
}) => {

    return (
        <div className='calendar-select-div'>
            <div>
                <span className='calendar-select-texts text-bold'>{today.format('DD')}</span>
                <span className='calendar-select-texts'>{today.format('MMMM')}</span>
            </div>
            <div className='calendar-select-buttons-wrapper'>
                <button onClick={prevDay} className="calendar-select-button"> &lt; </button>
                <button onClick={currentDay} className="calendar-select-button today">Сегодня</button>
                <button onClick={nextDay} className="calendar-select-button"> &gt; </button>
            </div>
        </div>
    )
}

export default DaySelect
