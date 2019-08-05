import React, { useEffect, useState } from 'react'
import PropTypes, { number } from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import { maxFlightIdSelector, maxTimeSelector, airportIdsSelector, distanceBetweenAirportsSelector } from '../../selectors/index'
import Order from './order/Order'
import { addOrder, createFlightFromOrder } from '../../actions/pageActions'
import { generateOrders } from '../../actions/pageActions'
import './OrderList.scss'

export function OrderList({
    orderIds, maxOrderId, maxTime, 
    generateOrders, airportDistances, 
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

OrderList.propTypes = {
    orderIds: PropTypes.arrayOf(number),
    maxOrderId: number,
    maxTime: PropTypes.instanceOf(moment), 
    generateOrders: PropTypes.func,
    airportDistances: PropTypes.func,
    airportsIds: PropTypes.arrayOf(number),
    addOrder: PropTypes.func,
    createFlightFromOrder: PropTypes.func,
    maxFlightId: number,
}

export default connect(
    (state) => ({
        maxTime: maxTimeSelector(state), 
        airportsIds: airportIdsSelector(state),       
        airportDistances: distanceBetweenAirportsSelector(state),
        maxFlightId: maxFlightIdSelector(state),
    }),
    { generateOrders, addOrder, createFlightFromOrder }
)(OrderList)

