import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { tailCoordinates } from '../../selectors/index'
import { addTailInFlight } from '../../actions/pageActions'
import Tail from './tail/Tail'
import './TailList.scss'

export function TailList({tails, addTailInFlight}) {
    const tailsArray = tails.map(tail => (
        <Tail key={tail.id} tail={tail}
            addTailAction={addTailInFlight}>
        </Tail>
    ))

    return (
        <div className="tails-container">{tailsArray}</div>
    )
}

TailList.propTypes = {
    tails: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            airportId: PropTypes.number,
        })
    ),
    addTail: PropTypes.func
}

export default connect(
    (state) => ({
        tails: tailCoordinates(state)
    }),
    { addTailInFlight }
)(TailList)