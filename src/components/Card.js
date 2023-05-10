import React from "react";
import PropTypes from 'prop-types'
import './Card.css'

function Card(props) {

    // constructor(props){
    //     super(props);
    //     this.state = {
    //         title: { title: null },
    //         subtitle: { subtitle: null },
    //         image: { image: null },
    //     }
    // }
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
                    <button><i className='bx bx-time'></i>Make appointment</button>
                    <h5><span>{'\u2605'}</span>{props.rating}</h5>
                </div>
            </div>
        </div>
    );
}

Card.propTypes = {
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    rating:PropTypes.number.isRequired,
};

export default Card;