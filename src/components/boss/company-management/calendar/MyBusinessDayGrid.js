import React from 'react';

import { Link } from 'react-router-dom';

import '../tasks/calendar/calendar.css';
import Spinner from '../../../layout/Spinner'


const MyBusinessDayGrid = ({
    startDay,
    business_list,
    openModalHandler
}) => {
    
    return (
        <>
            {!business_list ? 
            
            (<Spinner />) 
                :
            (
                <div className=''>
                <div className='bg-info' onClick={() => openModalHandler('Create')}><p className='text-center text-dark' style={{cursor: 'pointer', fontWeight: 'bold'}}>Создать дело</p></div>
                <ul>
                    {business_list.list && business_list.list.filter(list => list.finish.split('T', 1)[0] >= startDay.format('YYYY-MM-DD') && list.finish.split('T', 1)[0] <= startDay.clone().endOf('day').format('YYYY-MM-DD'))
                        .map((task) => 
                            (
                                <div className='border border-dark my-5'>
                                    <p>{task.content}</p>
                                </div>
                            ))
                    }
                </ul>
            </div>
            )
        }
        </>
    )
}

export default MyBusinessDayGrid;