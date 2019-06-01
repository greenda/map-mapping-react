import React from 'react'
import { connect } from 'react-redux'
import { flightsOnTime, tailCoordinates, airportsSelector } from '../../selectors/index'
import MapView from './MapView'

export function MapContainer({flights, tails, airports}) {
    return (
        <MapView flights={flights} tails={tails} airports={airports}/>
    )
}

export default connect((state) => ({
    tails: tailCoordinates(state),
    flights: flightsOnTime(state),
    airports: airportsSelector(state),
}))(MapContainer)

