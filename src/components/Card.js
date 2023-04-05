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
            <img src={props.image} alt={props.title} />
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.subtitle}</p>
            </div>
        </div>
    );
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
};

export default Card;