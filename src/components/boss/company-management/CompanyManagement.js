import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

const CompanyManagement = props => {
    return (
        <div className="container" style={{position: "relative", top: "12vh", left: "12vw"}}>
            <div className="row">
                <div className="col-12">
                    <ul className="list-inline">
                        <li className="list-inline-item bg-warning p-2 rounded-3"><Link to="/role-component">Создать роль</Link></li>
                        <li className="list-inline-item bg-warning p-2 rounded"><Link to="/my-business">Мои дела</Link></li>
                        <li className="list-inline-item bg-warning p-2 rounded"><Link to="/employee-list">Список сотрудников</Link></li>
                    </ul>
                </div>
            </div>
            
        </div>
    )
}

CompanyManagement.propTypes = {

}

export default CompanyManagement
