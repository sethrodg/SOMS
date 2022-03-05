import React from 'react';
import './cards.css';
function Card(props) {
    return (
        <div className="pop_nef">
            <div className="pop_item">
                <div className="pop_link">
                    <a href={props.link} target="_blank">
                        <img src={props.imgs} alt="test photo"></img>
                    </a>
                </div>
                <div className="pop_name">
                    <h3>{props.name}</h3>
                </div>
                <div className="pop_description">
                    <h6>{props.description}</h6>
                </div>
            </div>
        </div>
    );
}
export default Card;