import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { maxFlightIdSelector, maxTimeSelector, airportIdsSelector, airportsSelector, distanceBetweenAirportsSelector } from '../../selectors/index'
import Order from './order/Order'
import { addOrder, createFlightFromOrder } from '../../actions/pageActions'
import { generateOrders } from '../../actions/pageActions'
import './OrderList.scss'

export function OrderList({
    orderIds, maxOrderId, maxTime, 
    airports, generateOrders, airportDistances, 
    airportsIds, addOrder, createFlightFromOrder, maxFlightId}) {
    const [didMount, setDidMount] = useState(false)
    useEffect(() => {                
        generateOrders(maxTime, maxOrderId, airportsIds, airportDistances, !didMount)
        setDidMount(true)
    }, [maxTime])

    const orders = orderIds.map(value => (
        <Order 
            key={value} 
            id={value}
            addOrder={addOrder}
            maxFlightId={maxFlightId}
            createFlightFromOrder={createFlightFromOrder}/>))
    return (
        <div className="order-list-container">{orders}</div>
    )
}

// TODO propTypes
// OrderList.propTypes = {
//     flightIds: PropTypes.arrayOf(PropTypes.number)
// }

// export default connect(
//     (state) => ({
//         flightIds: flightIdsSelector(state),
//         maxTime: maxTimeSelector(state),
//         airports: airportIdsSelector(state),
//     }),
//     { generateFlights }
// )(FlightList)

export default connect(
    (state) => ({
        maxTime: maxTimeSelector(state), 
        airportsIds: airportIdsSelector(state),       
        airportDistances: distanceBetweenAirportsSelector(state),
        maxFlightId: maxFlightIdSelector(state),
    }),
    { generateOrders, addOrder, createFlightFromOrder }
)(OrderList)

