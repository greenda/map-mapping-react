import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { flightIdsSelector } from '../../selectors/index'
import Flight from './flight/Flight'
import './FlightList.scss'

export function FlightList({flightIds}) {
    const flights = flightIds.map(value => (<Flight key={value} id={value}/>))
    return (
        <div className="flight-list-container">{flights}</div>
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

