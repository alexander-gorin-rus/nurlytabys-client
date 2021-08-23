import React, {useState, useEffect} from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import "./styles.css"

const Calendar = ({business_list}) => {
  const [calendar, setCalendar] = useState([]);
  const [value, setValue] = useState(moment());
  const startDay = value.clone().startOf("month").startOf("week");
  const endDay = value.clone().endOf("month").endOf("week");

  useEffect(() => {
    const day = startDay.clone().subtract(1, 'day');
    const a  = [];
    while(day.isBefore(endDay, 'day')){
      a.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, 'day').clone())
      )
    }
    setCalendar(a)
  },[value])
  

  return (
    <div className='main-div-content'>
      <div className='calendar'>
        {calendar.map((week, index) => (
          <div key={index}>
            {week.map((d, index) => (
              <div 
                className='day'
                key={index}
              >
                {d.format("D").toString()}
                {
                  business_list && business_list.list.map((b, index) => (
                    <>
                    {d._d.toISOString().split('T', 1)[0] === b.finish.split('T', 1)[0] ? 
                      (
                        <div 
                          key={index}
                          className=''
                                                           
                        >
                          <Link to={`/my-business-by-id/${b._id}`}>
                            <p className="bg-warning px-1 mx-1" style={{ cursor: "pointer" }}>{b.title}</p>
                                                                  
                          </Link>
                          {console.log(d._d.toISOString().split('T', 1)[0])}
                        </div>
                      ) 
                        : 
                      (
                        null
                      )
                    }
                    </>
                                           
                  ))
                }
              </div>
            ))}

          </div>
        )
        )}
      </div>
    </div> 
  )
}

export default Calendar

// import React, { useState, useEffect } from "react";
// import buildCalendar from "./build";
// import Header from './Header';
// import dayStyles from "./dayStyles";
// import {beforeToday} from './dayStyles';

// //import "./Calendar.css";
// const Calendar = ({value,onChange}) => {
//   const [calendar, setCalendar] = useState([]);

//   useEffect(() => {
//     setCalendar(buildCalendar(value));
//   }, [value]);
  

//   return (
//     <div className="calendar">
//      <Header 
//      value={value} setValue={onChange}
//      />
//       <div className="body">
//         <div className="day-names">
//           {
//             ["sun","mon","tue","wed","thu","fri","sat"].map(d=>(
//               <div className="week">{d}</div>
//             ))
//           }
//         </div>
//         {calendar.map((week) => (
//           <div>
//             {week.map((day) => (
//               <div onClick={() => !beforeToday(day) && onChange(day)} className="day">
//                 <div className={dayStyles(day, value)}>
//                   {day.format("D").toString()}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Calendar;
