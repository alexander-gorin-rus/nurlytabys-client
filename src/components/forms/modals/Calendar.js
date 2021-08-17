import React, { useState, useEffect } from "react";
import buildCalendar from "./build";
import Header from './Header';
import dayStyles from "./DayStyles";
import {beforeToday} from './dayStyles';

import "./Calendar.css";
const Calendar = ({value,onChange}) => {
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);
  

  return (
    <div className="calendar">
     <Header 
     value={value} setValue={onChange}
     />
      <div className="body">
        <div className="day-names">
          {
            ["sun","mon","tue","wed","thu","fri","sat"].map(d=>(
              <div className="week">{d}</div>
            ))
          }
        </div>
        {calendar.map((week) => (
          <div>
            {week.map((day) => (
              <div onClick={() => !beforeToday(day) && onChange(day)} className="day">
                <div className={dayStyles(day, value)}>
                  {day.format("D").toString()}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;