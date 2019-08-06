import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { tailCoordinates } from '../../selectors/index'
import { addTailInFlight } from '../../actions/pageActions'
import TailListView from './TailListView'

export function TailListContainer({ tails, addTailInFlight }) {
    return (
        <TailListView 
            tails={tails}
            addTailInFlight={addTailInFlight}/>
    )
}

TailListContainer.propTypes = {
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
)(TailListContainer)