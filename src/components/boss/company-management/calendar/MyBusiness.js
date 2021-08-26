import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { Modal, Button } from 'antd';

const MyBusiness = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [values, setValues] = useState({
        title: '',
        start: '',
        end: ''
    });

    const { title, start, end } = values;

    const onChangeTitle = (e) => {
        // console.log(e.target.value)
        setValues({...values, title: e.target.value})
    }

    const handleSelect = (info) => {
        showModal();
        // console.log(info)
        setValues({...values, 
            start: info.startStr,
            end: info.endStr
        })
    }

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleOk = () => {
        setIsModalVisible(false);
        console.log(values)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }
    return (
        <div className='main-div-content'>
            <FullCalendar
                plugins={[ dayGridPlugin, interactionPlugin ]}
                initialView="dayGridMonth"
                firstDay={1}
                selectable={true}
                select={handleSelect}
                events={[
                    {title: 'complete calendar', date: '2021-09-01'}
                ]}
            />
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <input value={title} onChange={(e) => onChangeTitle(e)} />
            </Modal>
        </div>
    )
}

export default MyBusiness
















// import React, { Fragment, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import {
//     GetBusinessList,
//     CreateBusiness
// } from '../../../../redux/actions/business';
// import { connect } from 'react-redux';
// import Calendar_old from './Calendar_old'
// //import Calendar from './Calendar';
// import moment from 'moment';
// //import DatePicker from "react-datepicker";
// //import "react-datepicker/dist/react-datepicker.css";
// import { Link } from 'react-router-dom';


// const MyBusiness = ({
//     GetBusinessList,
//     CreateBusiness,
//     business: {business_list}
// }) => {


//     moment.locale('en', {week: {dow: 1}});
//     //const thisDay = new Date()
//     const currentDay = new Date().toISOString().slice(0, 10)
//     const [today, setToday] = useState(moment())
//     const startDay = today.clone().startOf('month').startOf('week');
//     window.moment = moment;

//     const prevMonth = () => {
//         setToday(prev => prev.clone().subtract(1, 'month'));
//     }

//     const currentMonth = () => {
//         setToday(moment());
//     }

//     const nextMonth = () => {
//         setToday(next => next.clone().add(1, 'month'));
//     }

//     useEffect(() => {
//         GetBusinessList()
//     },[GetBusinessList]);


//     const [dispalyForm, toggleForm] = useState(false);
//     const [values, setValues] = useState({
//         title: "",
//         content: "",
//         finish: new Date()
//     });

//     const { title, content, finish } = values;

//     const onChange = e =>
//         setValues({ ...values, [e.target.name]: e.target.value });

//     const onSubmit = (e) => {
//         e.preventDefault();
//         if(title === '' || content === '' || finish === ''){
//             alert('Все поля должны быть заполнены')
//         }else if(finish < currentDay){
//             alert('Назначенная дата уже истекла')
//         }
//         else{
//             CreateBusiness(values);
//         }
//         setValues({
//             title: "",
//             content: "",
//             finish: new Date()
//         });

//         setTimeout(() => {
//             GetBusinessList()
//         },300)
//     }

//     return (
//         <div className="main_container">
//             {business_list && business_list === null ?
//                 (
//                     <Fragment>
                        
//                     </Fragment>
//                 )
//                     :
//                 (
//                     <Fragment>
//                         <div className="main-div-content">
//                         <section style={{cursor: "pointer"}} 
//                             onClick={() => toggleForm(!dispalyForm)} 
//                             className="text-center text-light bg-success p-2">
//                                 {dispalyForm && dispalyForm ? (<p>Свернуть</p>) : (<p>Создать новое дело</p>)} 
//                         </section>
//                         </div>

//                         {
//                             dispalyForm && (
//                                 <div className="main-div-content">
//                                     <p className="text-center">Форма заполнения</p>
//                                     <form className="form mb-4" onSubmit={e => onSubmit(e)}>
//                                         <div>
//                                             <input
//                                                 type='text'
//                                                 placeholder='Название дела'
//                                                 name='title'
//                                                 value={title}
//                                                 onChange={e => onChange(e)}
//                                             />
//                                         </div>
//                                         <div>
//                                             <input
//                                                 type='text'
//                                                 placeholder='Описание дела'
//                                                 name='content'
//                                                 value={content}
//                                                 onChange={e => onChange(e)}
//                                             />
//                                         </div>
//                                         {/* <DatePicker 
//                                             selected={startDate} 
//                                             onChange={(date) => setStartDate(date)} 
                                            
//                                             /> */}
//                                         <div>
//                                             <label>Выбрать дату</label>
//                                             <p className='bg-danger px-1'>Внимание: на этом календаре неделя начинается с воскресенья</p>
//                                             <input 
//                                                 type="date" 
//                                                 name='finish'
//                                                 value={finish}
//                                                 onChange={e => onChange(e)}
//                                             />
//                                         </div>
//                                         <input type='submit' className='btn btn-primary' value='Отправить'/>
//                                     </form>
//                                 </div>
//                             )
//                         }

//                         <Calendar_old 
//                             business_list={business_list}
//                             startDay={startDay} 
//                             today={today}
//                             prevMonth={prevMonth}
//                             currentMonth={currentMonth}
//                             nextMonth={nextMonth} 
//                         />

//                         {
//                             business_list && business_list.list.map((b, index) => (
//                                 <div className="container" key={index}>
//                                     <div className="row">
//                                         <div className="col-12">
//                                             <Link to={`/my-business-by-id/${b._id}`}>
//                                                 <p className="bg-warning p-3" style={{ cursor: "pointer" }}>{b.title}</p>
//                                                 <p>start: {b.start}</p>
//                                                 <p>finish: {b.finish}</p>
//                                             </Link>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))
//                         }
//                     </Fragment>
//                 )
//             }
//         </div>
//     )
// }

// MyBusiness.propTypes = {
//     GetBusinessList: PropTypes.func.isRequired,
//     CreateBusiness: PropTypes.func.isRequired,
//     business: PropTypes.object,
// }

// const mapStateToProps = state => ({
//     business: state.business
// })

// export default connect(mapStateToProps,
//     {
//         GetBusinessList,
//         CreateBusiness
//     })(MyBusiness)
