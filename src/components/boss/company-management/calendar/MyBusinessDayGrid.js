import React from 'react';
import '../tasks/calendar/calendar.css';
import Spinner from '../../../layout/Spinner';


const MyBusinessDayGrid = ({
    startDay,
    business_list,
    openModalHandler,
    DeleteBusiness,
    GetBusinessList
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
                        .map((business) => 
                            (
                                <div key={business._id} className='border border-dark my-5'>
                                    <span className="mx-2">{business.content}</span>
                                    <p 
                                        className='bg-danger pointer' 
                                        onClick={() => {
                                            if (window.confirm('Вы действительно хотите удалить это дело?')) {
                                                DeleteBusiness(business._id)
                                            }
                                            setTimeout(() => {
                                                GetBusinessList()
                                            },200)
                                        }} 
                                    >удалить</p>
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