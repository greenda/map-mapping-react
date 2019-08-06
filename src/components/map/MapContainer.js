import React from 'react'
import { connect } from 'react-redux'
import { filteredFlightsSelector, tailCoordinates,
    airportsSelector, licencedRegionsIdsSelector,
    ordersToScheduleSelector, currentTimeSelector,
    maxTimeSelector } from '../../selectors/index'
import MapView from './MapView'

export function MapContainer({ currentTime, maxTime, flights, orders, tails,
    airports, regionIds, countries, onOrderClick }) {
    const hundleOrderClick = (id) => {
        onOrderClick(id)
    }
    
    return (
        <MapView 
            currentTime={currentTime}
            flights={flights} 
            isShowPlaned={currentTime.isSame(maxTime)}
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
    maxTime: maxTimeSelector(state),
    tails: tailCoordinates(state),
    flights: filteredFlightsSelector(state),
    airports: airportsSelector(state),
    regionIds: licencedRegionsIdsSelector(state),
    orders: ordersToScheduleSelector(state),
}))(MapContainer)

