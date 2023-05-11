import React from "react";
import PropTypes from 'prop-types'
import './Card.css'
import { Link } from 'react-router-dom'

function Card(props) {
    return (
        <div className="card">
            <img src={props.image} alt="" />
            <div className="card-body">
                <div className="title">
                    <h5 className="card-title">Dr. {props.firstname}</h5>
                    <h5 className="card-title">{props.lastname}</h5>
                </div>
                <div className="specialization">
                    <h5>{props.content}</h5>
                </div>
                <div className="rating">
                    {props.id && (
                        <Link
                            to={{
                                pathname: '/makeappointment',
                                search: `?id=${props.id}`,
                            }}
                            onClick={() => sessionStorage.setItem('id', props.id)}
                        >
                            Make Appointment
                        </Link>
                    )}

                    {/* <button onClick={handleMakeAppointment}><i className='bx bx-time'></i>Make appointment</button> */}
                    <h5><span>{'\u2605'}</span>{props.rating}</h5>
                </div>
            </div>
        </div>
    );
}

Card.propTypes = {
    id: PropTypes.number.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
};

export default Card;