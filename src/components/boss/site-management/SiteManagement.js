import React from 'react'
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SiteManagement = () => {
    return (
        <div className='container bg-info' style={{marginTop: "15vh"}}>
            <div className='row pt-5'>
                <div className='col-6'>
                    <Link className='link-text-color' to='/excess-to-register'>Управление паролем для регистрации сотрудников</Link>
                </div>
                <div className='col-6'>
                <Link className='link-text-color' to='/main-page-info'>Управление информацией для главной страницы</Link>
                </div>
            </div>
            <div className='row pt-5'>
                <div className='col-6'>
                    <Link className='link-text-color' to='/upload-video'>Управление видео материалами</Link>
                </div>
                <div className='col-6'>
                <Link className='link-text-color' to='/main-page-info'>Управление информацией для главной страницы</Link>
                </div>
            </div>
            <div className='row pt-5 pb-5'>
                <div className='col-6'>
                    <Link className='link-text-color' to='/categories'>Управление категориями</Link>
                </div>
                <div className='col-6'>
                <Link className='link-text-color' to='/create-contacts'>Управление контактами</Link>
                </div>
            </div>
        </div>
    )
}

SiteManagement.propTypes = {

}

export default SiteManagement
