import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { flightIdsSelector, maxTimeSelector, airportIdsSelector } from '../../selectors/index'
import Flight from './flight/Flight'
import { generateFlights } from '../../actions/pageActions'
import './FlightList.scss'

export function FlightList({flightIds, maxTime, airports, generateFlights}) {
    useEffect(() => {
        generateFlights(maxTime, Math.max(...flightIds), airports)
    }, [maxTime])

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
        flightIds: flightIdsSelector(state),
        maxTime: maxTimeSelector(state),
        airports: airportIdsSelector(state),
    }),
    { generateFlights }
)(FlightList)

