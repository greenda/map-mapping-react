import React from 'react'
import { connect } from 'react-redux'
import { filteredFlightsSelector, tailCoordinates,
    airportsSelector, licencedRegionsIdsSelector,
    ordersToScheduleSelector, currentTimeSelector } from '../../selectors/index'
import MapView from './MapView'

export function MapContainer({ currentTime, flights, orders, tails,
    airports, regionIds, countries, onOrderClick }) {
    const hundleOrderClick = (id) => {
        onOrderClick(id)
    }
    return (
        <MapView 
            currentTime={currentTime}
            flights={flights} 
            orders={orders}
            tails={tails}
            onOrderClick={hundleOrderClick}
            airports={airports}
            countries={countries}
            regionIds={regionIds}/>
    )
}

// TODO PropTypes

export default connect((state) => ({
    currentTime: currentTimeSelector(state),
    tails: tailCoordinates(state),
    flights: filteredFlightsSelector(state),
    airports: airportsSelector(state),
    regionIds: licencedRegionsIdsSelector(state),
    orders: ordersToScheduleSelector(state),
}))(MapContainer)

