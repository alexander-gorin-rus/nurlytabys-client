import React from 'react';


const MyPersonalPage = ({
    employee
}) => {
    return (
        <div className='main-div-content'>
            {employee ? employee.name : null }
        </div>
    )
}

export default MyPersonalPage