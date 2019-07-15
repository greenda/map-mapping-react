import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { flightIdsSelector, maxTimeSelector, airportIdsSelector, airportsSelector, distanceBetweenAirportsSelector } from '../../selectors/index'
import Order from './order/Order'
import { addOrder } from '../../actions/pageActions'
import { generateOrders } from '../../actions/pageActions'
import './OrderList.scss'

export function OrderList({orderIds, maxTime, airports, generateOrders, airportDistances, airportsIds, addOrder}) {
    useEffect(() => {        
        generateOrders(maxTime, Math.max(...orderIds), airportsIds, airportDistances)
    }, [maxTime])

    const orders = orderIds.map(value => (<Order key={value} id={value} addOrder={addOrder}/>))
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
    }),
    { generateOrders, addOrder }
)(OrderList)

