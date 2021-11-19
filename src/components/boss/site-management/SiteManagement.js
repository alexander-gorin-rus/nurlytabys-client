import React from 'react'
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SiteManagement = () => {
    return (
        <div className="main-div-content">
            <div className="row">
                <div className="col-12">
                    <ul className="list-block">
                        <li className="mt-3 app-text list-block-item bg-info p-2 rounded"><Link to='/main-page-info'>Управление информацией для главной страницы</Link></li>
                        <li className="mt-3 app-text list-block-item bg-info p-2 rounded"><Link to='/upload-video'>Управление видео материалами</Link></li>
                        <li className="mt-3 app-text list-block-item bg-info p-2 rounded"><Link to='/categories'>Управление категориями</Link></li>
                    </ul>
                </div>
            </div>
            <Link className='d-block p-3 mt-4 bg-warning app-text-small' to='/boss-page'>Вернуться на мою страницу</Link>
        </div>
    )
}

SiteManagement.propTypes = {

}

export default SiteManagement
