import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { flightIdsSelector } from '../../selectors/index'
import Flight from './flight/Flight'

export function FlightList({flightIds}) {
    console.log('flightIds ' + flightIds)
    const flights = flightIds.map(value => (<div key={value}><Flight id={value}/></div>))
    return (
        <div>{flights}</div>
    )
}

FlightList.propTypes = {
    flightIds: PropTypes.arrayOf(PropTypes.number)
}

export default connect(
    (state) => ({
        flightIds: flightIdsSelector(state)
    })
)(FlightList)

