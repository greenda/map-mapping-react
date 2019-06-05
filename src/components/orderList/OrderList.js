import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { flightIdsSelector, maxTimeSelector, airportIdsSelector } from '../../selectors/index'
import Order from './order/Order'
import { addOrder } from '../../actions/pageActions'
import { generateFlights } from '../../actions/pageActions'
import './OrderList.scss'

export function OrderList({orderIds, maxTime, airports, generateFlights, addOrder}) {
    // useEffect(() => {
    //     generateFlights(maxTime, Math.max(...flightIds), airports)
    // }, [maxTime])

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
    () => {},
    { addOrder }
)(OrderList)

