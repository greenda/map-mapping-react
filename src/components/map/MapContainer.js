import React from 'react'
import { connect } from 'react-redux'
import { flightsOnTime, tailCoordinates,
    airportsSelector, licencedRegionsIdsSelector } from '../../selectors/index'
import MapView from './MapView'

export function MapContainer({flights, tails, airports, regionIds, countries}) {
    return (
        <MapView 
            flights={flights} 
            tails={tails}
            airports={airports}
            countries={countries}
            regionIds={regionIds}/>
    )
}

export default connect((state) => ({
    tails: tailCoordinates(state),
    flights: flightsOnTime(state),
    airports: airportsSelector(state),
    regionIds: licencedRegionsIdsSelector(state),
}))(MapContainer)

