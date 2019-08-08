import React from 'react'
import { connect } from 'react-redux'
import PropTypes, { number, string } from 'prop-types'
import moment from 'moment'
import { maxFlightIdSelector } from '../../../selectors/index'
import { addOrder, createFlightFromOrder } from '../../../actions/pageActions'
import OrderScheduleRowView from './OrderScheduleRowView'

export function OrderScheduleRowContainer({ 
    orders, cellWidthScale,
    currentTime, timelineOffsetHours, isLast,
    createFlightFromOrder, addOrder,
    maxFlightId, leftOffset
 }) {
    return (
       <OrderScheduleRowView 
            orders={orders}
            cellWidthScale={cellWidthScale}
            currentTime={currentTime}
            timelineOffsetHours={timelineOffsetHours}
            isLast={isLast}
            createFlightFromOrder={createFlightFromOrder}
            addOrder={addOrder}
            maxFlightId={maxFlightId}
            leftOffset={leftOffset}
       />
    )
 }

 OrderScheduleRowContainer.propTypes = {
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
    cellWidthScale: number,
    currentTime: PropTypes.instanceOf(moment),
    timelineOffsetHours: number,
    isLast: PropTypes.bool,
    createFlightFromOrder: PropTypes.func,
    addOrder: PropTypes.func,
    maxFlightId: number,
    leftOffset: number,
}

 export default connect(
    (state) => ({
        maxFlightId: maxFlightIdSelector(state),
    }), 
    { addOrder, createFlightFromOrder }
)(OrderScheduleRowView)