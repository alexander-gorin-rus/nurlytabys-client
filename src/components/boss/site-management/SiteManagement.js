import React from 'react'
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SiteManagement = () => {
    return (
        // <div className='main-div-content'>
        //     <div className='row pt-5'>
        //         <div className='col-6'>
        //             <Link className='link-text-color' to='/excess-to-register'>Управление паролем для регистрации сотрудников</Link>
        //         </div>
        //         <div className='col-6'>
        //         <Link className='link-text-color' to='/main-page-info'>Управление информацией для главной страницы</Link>
        //         </div>
        //     </div>
        //     <div className='row pt-5'>
        //         <div className='col-6'>
        //             <Link className='link-text-color' to='/upload-video'>Управление видео материалами</Link>
        //         </div>
        //         <div className='col-6'>
        //         <Link className='link-text-color' to='/main-page-info'>Управление информацией для главной страницы</Link>
        //         </div>
        //     </div>
        //     <div className='row pt-5 pb-5'>
        //         <div className='col-6'>
        //             <Link className='link-text-color' to='/categories'>Управление категориями</Link>
        //         </div>
        //         <div className='col-6'>
        //         <Link className='link-text-color' to='/create-contacts'>Управление контактами</Link>
        //         </div>
        //     </div>
        //     <Link className='d-block p-3 mt-4 bg-warning ' to='/boss-page'>Вернуться на мою страницу</Link>
        // </div>



            <div className="main-div-content">
            <div className="row">
                <div className="col-12">
                    <ul className="list-block">
                        <li className="mt-3 app-text list-block-item bg-info p-2 rounded-3"><Link to='/excess-to-register'>Управление паролем для регистрации сотрудников</Link></li>
                        <li className="mt-3 app-text list-block-item bg-info p-2 rounded"><Link to='/main-page-info'>Управление информацией для главной страницы</Link></li>
                        <li className="mt-3 app-text list-block-item bg-info p-2 rounded"><Link to='/upload-video'>Управление видео материалами</Link></li>
                        <li className="mt-3 app-text list-block-item bg-info p-2 rounded"><Link to='/categories'>Управление категориями</Link></li>
                        <li className="mt-3 app-text list-block-item bg-info p-2 rounded"><Link to='/create-contacts'>Управление контактами</Link></li>
                    </ul>
                </div>
            </div>
            <Link className='d-block p-3 mt-4 bg-warning ' to='/boss-page'>Вернуться на мою страницу</Link>
            </div>
    )
}

SiteManagement.propTypes = {

}

export default SiteManagement
