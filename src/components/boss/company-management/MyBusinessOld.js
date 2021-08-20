import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    GetBusinessList,
    CreateBusiness
} from '../../../redux/actions/business';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//import { Calendar_ } from './Calendar_';
import moment from 'moment';

const MyBusiness = ({
    GetBusinessList,
    CreateBusiness,
    business: {business_list}
}) => {

    moment.locale('en', {week: {dow: 1}});
    //const today = moment();
    const [today, setToday] = useState(moment())
    const startDay = today.clone().startOf('month').startOf('week');
    window.moment = moment;

    const prevMonth = () => {
        setToday(prev => prev.clone().subtract(1, 'month'));
    }

    const currentMonth = () => {
        setToday(moment());
    }

    const nextMonth = () => {
        setToday(next => next.clone().add(1, 'month'));
    }

    useEffect(() => {
        GetBusinessList()
    },[GetBusinessList]);


    const [dispalyForm, toggleForm] = useState(false);
    const [values, setValues] = useState({
        title: "",
        content: "",
        finish: null
    });

    const { title, content, finish } = values;

    const onChange = e =>
        setValues({ ...values, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        CreateBusiness(values);
        setValues({
            title: "",
            content: "",
            finish: null
        });
        setTimeout(() => {
            GetBusinessList()
        },300)
    }

    return (
        <div className="main_container">
            {business_list && business_list.list.length === 0 ? 
                (
                    <p className="text-center bg-primary p-3 text-light">Список дел пока пуст</p>
                )
                    :
                (
                    <p className="text-center bg-primary p-3 text-light">Список моих дел</p>
                )
            }
            
            {business_list && business_list === null ?
                (
                    <Fragment>
                        
                    </Fragment>
                )
                    :
                (
                    <Fragment>
                        <p style={{cursor: "pointer"}} 
                            onClick={() => toggleForm(!dispalyForm)} 
                            className="text-center text-light bg-danger p-2">
                                Создать новое дело
                        </p>

                        {
                            dispalyForm && (
                                <div>
                                    <p className="text-center">Форма заполнения</p>
                                    <form className="form mb-4" onSubmit={e => onSubmit(e)}>
                                        <div>
                                            <input
                                                type='text'
                                                placeholder='Название дела'
                                                name='title'
                                                value={title}
                                                onChange={e => onChange(e)}
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type='text'
                                                placeholder='Описание дела'
                                                name='content'
                                                value={content}
                                                onChange={e => onChange(e)}
                                            />
                                        </div>
                                        <div>
                                            <label>Выбрать дату</label>
                                            <input 
                                                type="date" 
                                                name='finish'
                                                value={finish}
                                                onChange={e => onChange(e)}
                                            />
                                        </div>
                                        <input type='submit' className='btn btn-primary' value='Отправить'/>
                                    </form>
                                </div>
                            )
                        }
                       
                        <Calendar 
                            business_list={business_list}
                            startDay={startDay} 
                            today={today}
                            prevMonth={prevMonth}
                            currentMonth={currentMonth}
                            nextMonth={nextMonth} 
                        />

                        {
                            business_list && business_list.list.map((b, index) => (
                                <div className="container" key={index}>
                                    <div className="row">
                                        <div className="col-12">
                                            <Link to={`/my-business-by-id/${b._id}`}>
                                                <p className="bg-warning p-3" style={{ cursor: "pointer" }}>{b.title}</p>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </Fragment>
                )
            }
        </div>
    )
}

MyBusiness.propTypes = {
    GetBusinessList: PropTypes.func.isRequired,
    CreateBusiness: PropTypes.func.isRequired,
    business: PropTypes.object,
}

const mapStateToProps = state => ({
    business: state.business
})

export default connect(mapStateToProps,
    {
        GetBusinessList,
        CreateBusiness
    })(MyBusiness)
