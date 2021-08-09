import React, { Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { 
    GetBusinessById,
    DeleteBusiness
} from '../../../redux/actions/business';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const MyBusinessById = ({
    GetBusinessById,
    DeleteBusiness,
    business: {business_by_id}
}) => {

    const { id } = useParams();
    const history = useHistory()

    useEffect(() => {
        GetBusinessById(id)
    },[GetBusinessById]);

    const onDelete = (id) => {
        if(window.confirm('Вы действительно желаете удалить это дело из списка?')){
            DeleteBusiness(id)
        }
        history.push('/my-business')
    }

    return (
        <div className="main_container">
            {business_by_id && business_by_id.business ? 
                (
                    <Fragment>
                        <div>
                            <p>{business_by_id.business.title}</p>
                            <p>{business_by_id.business.content}</p>
                            <p>{business_by_id.business.start.toString()}</p>
                            <p 
                                style={{cursor: "pointer"}} 
                                className="bg-danger p-3" 
                                onClick={() => onDelete(business_by_id.business._id)} >Удалить дело</p>
                        </div>
                        <Link className='d-block p-3 mt-4 bg-warning ' to='/my-business'>Вернуться на страницу управления компанией</Link>
                    </Fragment>
                )
                    :
                (
                    <Fragment>

                    </Fragment>
                )        
            } 
        </div>
    )
}

MyBusinessById.propTypes = {
    GetBusinessById: PropTypes.func.isRequired,
    DeleteBusiness: PropTypes.func.isRequired,
    business: PropTypes.object,
}

const mapStateToProps = state => ({
    business: state.business
})

export default connect(mapStateToProps, {
    GetBusinessById,
    DeleteBusiness
})(MyBusinessById)

