import React from 'react'
import PropTypes from 'prop-types'
import TailContainer from './tail/TailContainer'
import './TailListView.scss'

export function TailListView({ tails, addTailInFlight }) {
    const tailsArray = tails.map(tail => (
        <TailContainer key={tail.id} tail={tail}
            addTailAction={addTailInFlight}>
        </TailContainer>
    ))

    return (
        <div className="tails-container">{tailsArray}</div>
    )
}

TailListView.propTypes = {
    tails: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            airportId: PropTypes.number,
        })
    ),
    addTail: PropTypes.func
}

export default TailListView