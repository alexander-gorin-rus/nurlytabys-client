import React from 'react'
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


    //make an array from business_list
    const business = business_list && business_list.list;
    console.log(business);
    // const b_finish = business && business.map((b, i) => (
    //     <div keyi={i}>
    //         <p>{b.finish}</p>
    //     </div>
    // ));
    // console.log(b_finish)

    
    //const moment = moment();
    window.moment = moment;
    //const calenderStructure = 42;
    const day = startDay.clone().subtract(1, 'day');
    const daysArray = [...Array(42)].map(() => day.add(1, 'day').clone());

    const CellWrapper = styled.div`
        min-width: 90px;
        min-height: 50px;
        background: ${props => props.isWeekend ? '#1daf49' : '#aae9e9'};
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
    <CellWrapper 
        key={d.format('DD-MM-YYYY')}
        //key={index}
        isWeekend={d.day() === 6 || d.day() === 0}
        >
        {
            !isCurrentDay(d) && d.format('D') ? 
                (
                    <>
                        <div>
                            {d.format('D')}
                            {console.log(d._d)}
                        </div>
                        {
                            business_list && business_list.list.map((b, index) => (
                                <>
                                    {d._d.toISOString().split('T', 1)[0] === b.finish.split('T', 1)[0] ? 
                                            (
                                                <div 
                                                    key={index}
                                                    className='calendar-cell-text'
                                                >
                                                    <Link to={`/my-business-by-id/${b._id}`}>
                                                        <p className="bg-warning px-1 mx-1" style={{ cursor: "pointer" }}>{b.title}</p>
                                                        
                                                    </Link>
                                                </div>
                                            ) 
                                                :                                                      (
                                                null
                                            )
                                        }
                                    </>
                                
                                ))
                        } 
                    </>
                ) 
                    : 
                (
                    <>
                     <div className='calendar-current-day'>
                         {d.format('D')}  
                     </div>
                     
                        {
                            business_list && business_list.list.map((b, index) => (
                                <>
                                    {d._d.toISOString().split('T', 1)[0] === b.finish.split('T', 1)[0] ? 
                                            (
                                                <div 
                                                    key={index}
                                                    className='calendar-cell-text'
                                                >
                                                    <Link to={`/my-business-by-id/${b._id}`}>
                                                        <p className="bg-warning px-1 mx-1" style={{ cursor: "pointer" }}>{b.title}</p>
                                                        
                                                    </Link>
                                                </div>
                                            ) 
                                                :                                                      (
                                                null
                                            )
                                        }
                                    </>
                                
                                ))
                        } 
                        
                    </>
                )
        }
    </CellWrapper>
))}
        </div>
        </div>
    )
}

export default Calendar





// import React from 'react'
// import styled from 'styled-components'
// import moment from 'moment';
// import { Link } from 'react-router-dom';


// const Calendar = ({
//     startDay, 
//     today,
//     prevMonth,
//     currentMonth,
//     nextMonth,
//     business_list
// }) => {

    
//     //const moment = moment();
//     window.moment = moment;
//     //const calenderStructure = 42;
//     const day = startDay.clone().subtract(1, 'day');
//     const daysArray = [...Array(42)].map(() => day.add(1, 'day').clone());

//     const CellWrapper = styled.div`
//         min-width: 90px;
//         min-height: 50px;
//         background: ${props => props.isWeekend ? '#87e4d0' : '#99bcca'};
//         border: 1px solid white;
//         margin: 7px 7px 7px 7px;
//         border-radius: 5px;
//         @media (max-width: 850px) {
//               min-width: 60px;
//               min-height: 50px;
//               margin: 3px;
           
//           }
//           @media (max-width: 580px) {
//             min-width: 30px;
//             min-height: 20px;
//             margin: 3px;
         
//         }
//     `

//     const isCurrentDay = (day) => moment().isSame(day, 'day');
//     const isCurrentMonth = (month) => moment.isSame(month, 'month');

//     return (
//         <div className="calendar ">
//             <div className="calendar-header">
//                 header
//             </div>
//             <div className="calendar-header-content">
//                 <div>
//                     <span className="calendar-header-content-month">
//                         <b>
//                            {today.format('MMMM')}
//                         </b>   
//                     </span >
//                     <span className="calendar-header-content-year">
//                         {today.format('YYYY')}
//                     </span>
//                 </div>
//                 <div className="calendar-buttons-div">
//                     <button 
//                         className="calendar-header-content-button"
//                         onClick={prevMonth}
//                         >
//                             &lt; 
//                     </button>
//                     <button 
//                         className="calendar-header-content-button"
//                         onClick={currentMonth}
//                         >
//                             Текущий месяц
//                     </button>
//                     <button 
//                         className="calendar-header-content-button"
//                         onClick={nextMonth}
//                         >
//                             &gt; 
//                     </button>
//                 </div>
//             </div>
//             <div className="calendar-grid">
//             {[...Array(7)].map((d, index) => (
//                 <div key={index} className="calendar-week-days">
//                     <p>{moment().day(d + 1).format('ddd')}</p>
//                 </div>
//             ))}
//             {daysArray.map((d, index) => (
//                 <CellWrapper 
//                     //key={d.format('DD-MM-YYYY')}
//                     key={index}
//                     isWeekend={d.day() === 6 || d.day() === 0}
//                     >
//                     {
//                         !isCurrentDay(d) && d.format('D') ? 
//                             (
//                                 <div>
                                    
//                                     {d.format('D')}
//                                     {
//                                         business_list && business_list.list.map((b, index) => (
//                                             <>
//                                             {d._d.toISOString().split('T', 1)[0] === b.finish.split('T', 1)[0] ? 
//                                                     (
//                                                         <div 
//                                                             key={index}
//                                                             className='calendar-cell-text'
                                                           
//                                                         >
//                                                             <Link to={`/my-business-by-id/${b._id}`}>
//                                                                 <p className="bg-warning px-1 mx-1" style={{ cursor: "pointer" }}>{b.title}</p>
                                                                
//                                                             </Link>
//                                                         </div>
//                                                     ) 
//                                                         : 
//                                                     (
//                                                         null
//                                                     )
//                                                 }
//                                             </>
                                           
//                                         ))
//                                     }
                                     
//                                 </div> 
//                             ) 
//                                 : 
//                             (
//                                 <>
//                                 <div className='calendar-current-day'>
//                                     {d.format('D')}  
//                                 </div>
//                                 {
//                                     business_list && business_list.list.map((b, index) => (
//                                         <>
//                                             {d._d.toISOString().split('T', 1)[0] === b.finish.split('T', 1)[0] ? 
//                                                     (
//                                                         <div 
//                                                             key={index}
//                                                             className='calendar-cell-text'
//                                                         >
//                                                             <Link to={`/my-business-by-id/${b._id}`}>
//                                                                 <p className="bg-warning px-1 mx-1" style={{ cursor: "pointer" }}>{b.title}</p>
                                                                
//                                                             </Link>
//                                                         </div>
//                                                     ) 
//                                                         : 
//                                                     (
//                                                         null
//                                                     )
//                                                 }
//                                             </>
                                           
//                                         ))
//                                     }
//                                 </>
//                             )
//                     }
//                 </CellWrapper>
//             ))}
//         </div>
//         </div>
//     )
// }

// export default Calendar


