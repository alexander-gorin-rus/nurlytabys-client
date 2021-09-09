import React from 'react';
import { Link } from 'react-router-dom'

const CompanyManagement = props => {
    return (
        <div className="main-div-content">
            <div className="row">
                <div className="col-12">
                    <ul className="list-block">
                        <li className="mt-3 app-text list-block-item bg-info p-2 rounded"><Link to="/my-business">Мои дела</Link></li>
                        <li className="mt-3 app-text list-block-item bg-info p-2 rounded"><Link to="/tasks">Мои поручения</Link></li>
                        <li className="mt-3 app-text list-block-item bg-info p-2 rounded"><Link to="/employee-list">Список сотрудников</Link></li>
                        {/* <li className="mt-3 app-text list-block-item bg-info p-2 rounded"><Link to="/business-scheduler">Планировщик заданий</Link></li> */}
                        <li className="mt-3 app-text list-block-item bg-info p-2 rounded-3"><Link to="/role-component">Управления должностями</Link></li>
                    </ul>
                </div>
            </div>
            <Link className='d-block p-3 mt-4 bg-warning app-text-small' to='/boss-page'>Вернуться на мою страницу</Link>
        </div>
    )
}

export default CompanyManagement
