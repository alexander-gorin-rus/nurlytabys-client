import React, {useEffect, Fragment} from 'react'
import PropTypes from 'prop-types';
import { GetEmployeeList } from '../../../../redux/actions/employee_actions';
import { connect } from 'react-redux';
import SideBar from './sidebar/SideBar';
import Topbar from './topbar/Topbar';
import Feed from './feed/Feed';
import RightBar from './rightbar/RightBar'

const BusinessScheduler = ({
    GetEmployeeList,
    employee_reducer: {employee_list}
}) => {

    useEffect(() => {
        GetEmployeeList()
    },[GetEmployeeList]);

    return (
        <div className="main-div-content">
            <Topbar />
            <div className="homeContainer">
                <SideBar employee_list={employee_list}/> 
                <Feed />
                <RightBar />   
            </div>
            
           
            
            {/* {employee_list.list && employee_list.list.map((l, index) => 
                (
                    <div className="bg-info" key={index}>
                        {l && l.boss === 1 ? 
                            (
                                <Fragment></Fragment>
                            )
                                :
                            (
                                <Fragment>
                                <p className="text-center">{l.name}</p>
                                <p className="text-center">{l.lastName}</p>  
                                {!l.role ? 
                                    (
                                        <p className="text-center">должность пока не присвоена</p>
                                    )
                                        :
                                    (
                                        <p className="text-center">{l.role.name}</p>
                                    )
                                }  
                                {console.log(l)}
                                </Fragment>
                            )
                        }
                    </div>
                ))
            } */}
           
        </div>
    )
}

BusinessScheduler.propTypes = {
    GetEmployeeList:PropTypes.func.isRequired,
    employee_reducer: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    employee_reducer: state.employee_reducer
})
export default connect(mapStateToProps,{
    GetEmployeeList
})(BusinessScheduler)
