import React, { useEffect, useState } from 'react'
import PropTypes, { number } from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import { maxFlightIdSelector, maxTimeSelector,
    airportIdsSelector, distanceBetweenAirportsSelector } from '../../selectors/index'
import Order from './order/Order'
import { addOrder, createFlightFromOrder } from '../../actions/pageActions'
import { generateOrders } from '../../actions/pageActions'
import './OrderList.scss'

export function OrderList({
    orderIds, maxOrderId, maxTime, 
    generateOrders, airportDistances, 
    airportsIds, addOrder, createFlightFromOrder, 
    maxFlightId, selectedOrder}) {
    const [didMount, setDidMount] = useState(false)
    const scrollToRef = (ref) => {
        if (ref && ref.current) {            
            ref.current.scrollIntoView()
        }        
    }

    useEffect(() => {                
        generateOrders(maxTime, maxOrderId, airportsIds, airportDistances, !didMount)
        setDidMount(true)
    }, [maxTime])

    useEffect(() => {  
        if (selectedOrder) {
            scrollToRef(orderRefs[selectedOrder])        
        }
    }, [selectedOrder])

    const orderRefs = orderIds.reduce((result, id) => {
        result[id] = React.createRef()
        return result
    }, {})
    const orders = orderIds.map(value => (
        <div ref={orderRefs[value]} key={value}>
            <Order 
                id={value}
                addOrder={addOrder}
                maxFlightId={maxFlightId}                
                createFlightFromOrder={createFlightFromOrder}/>
        </div>
        ))
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
    selectedOrder: number,
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

