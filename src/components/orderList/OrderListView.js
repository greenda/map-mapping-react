import React, { useEffect } from 'react'
import PropTypes, { number } from 'prop-types'
import OrderContainer from './order/OrderContainer';
import './OrderListView.scss'

export function OrderListView({
    orderIds, addOrder, createFlightFromOrder, 
    maxFlightId, selectedOrder}) {
    
    const scrollToRef = (ref) => {
        if (ref && ref.current) {            
            ref.current.scrollIntoView()
        }        
    }

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
            <OrderContainer
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

OrderListView.propTypes = {
    orderIds: PropTypes.arrayOf(number),
    addOrder: PropTypes.func,
    createFlightFromOrder: PropTypes.func,
    maxFlightId: number,
    selectedOrder: number,
}

export default OrderListView

