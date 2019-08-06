import React from 'react';
import PropTypes, { number, string } from 'prop-types'
import './TailView.scss'

export function TailView({ tail }) {
    const { id, name, airport } = tail
    return (
        <div className="tails__item" id={id}>
            <span className="tails__item__name">{name}</span>
            <span className="tails__item__airport"> {airport ? airport.iata : ''} </span>            
        </div>
    )        
}

TailView.prototype = {
    tail: PropTypes.shape({
        id: number,
        name: string, 
        airportId: number,
        progress: number,
    }),
}

export default TailView;  