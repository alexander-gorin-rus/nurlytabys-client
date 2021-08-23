import React from 'react'
const Header = ({value,setValue}) => {
    function currMonthName(){
        return value.format("MMMM")
      }
     
      function currYearName(){
          return value.format("YYYY")
      }
     
     function prevMonth(){
       return value.clone().subtract(1,"month");
     }
     function nextMonth(){
       return value.clone().add(1,"month");
     }
     function thisMonth(){
         return value.isSame(new Date(),"month")
     }
    return (
        <div className="header">
        <div className="previous"
        onClick={()=>!thisMonth() && setValue(prevMonth())}>{!thisMonth() && String.fromCharCode(171)}</div>
        <div>{currMonthName()} {currYearName()}</div>
        <div className="next"
        onClick={()=>setValue(nextMonth())}>{String.fromCharCode(187)}</div>
    </div>
    )
}

export default Header