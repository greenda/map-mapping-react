import React from 'react'
import PropTypes, { number, string } from 'prop-types'
import moment from 'moment'
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

MapContainer.propTypes = {
    currentTime: PropTypes.instanceOf(moment),
    maxTime: PropTypes.instanceOf(moment),
    flights: PropTypes.arrayOf(PropTypes.shape({ 
        id: number, 
        name: string,
        tailId: number,
        from: PropTypes.object,
        to: PropTypes.object,
        fromIata: PropTypes.string,
        toIata: PropTypes.string,
        dateTakeOff: PropTypes.object,
        dateLanding: PropTypes.object,
        status: string,
        linkedFlightId: number,
    })),
    orders: PropTypes.arrayOf(PropTypes.shape({
        id: number,
        name: string,
        fromId: number,
        toId: number,
        dateTakeOff: PropTypes.instanceOf(moment),
        dateLanding: PropTypes.instanceOf(moment),
        status: string,
        progress: number,
        orderId: number,
        pay: number,
        cost: number,
        description: string,
    })),
    tails: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            airportId: PropTypes.number,
        })
    ),
    airports: PropTypes.arrayOf(
        PropTypes.shape({ 
            id: number,
            name: string,
            iata: string,
            countriesId: number,
            latt: number,
            longt: number,
            costOnHour: number,
        })
    ),
    regionIds: PropTypes.arrayOf(number),
    countries: PropTypes.object,
    onOrderClick: PropTypes.func,
}

export default connect((state) => ({
    currentTime: currentTimeSelector(state),
    maxTime: maxTimeSelector(state),
    tails: tailCoordinates(state),
    flights: filteredFlightsSelector(state),
    airports: airportsSelector(state),
    regionIds: licencedRegionsIdsSelector(state),
    orders: ordersToScheduleSelector(state),
}))(MapContainer)

