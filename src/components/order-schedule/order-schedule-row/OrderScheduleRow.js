import React from 'react'
import { connect } from 'react-redux'
import PropTypes, { number, string } from 'prop-types'
import moment from 'moment'
import OrderScheduleCell from './order-schedule-cell/OrderScheduleCell'
import { maxFlightIdSelector } from '../../../selectors/index'
import { addOrder, createFlightFromOrder } from '../../../actions/pageActions'
import './OrderScheduleRow.scss'

export function OrderScheduleRow({ 
    orders, cellWidthScale,
    currentTime, timelineOffsetHours, isLast,
    createFlightFromOrder, addOrder,
    maxFlightId, leftOffset
 }) {
    return (
        <div className={`schedule__row order-schedule-row ${isLast ? 'last' : ''}`} >
            {orders.map((order, i) => (
                <OrderScheduleCell 
                    className={`schedule__row ${(orders.length - 1) === i ? 'last' : ''}`} 
                    cellWidthScale={cellWidthScale}
                    currentTime={currentTime}
                    addOrder={addOrder}
                    createFlightFromOrder={createFlightFromOrder}
                    timelineOffsetHours={timelineOffsetHours}
                    maxFlightId={maxFlightId}
                    key={order.id} order={order}/>)
            )}
            <div className="schedule__timeline" style={{left: `${leftOffset}px`}}></div>
        </div>
    )
}

OrderScheduleRow.propTypes = {
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
)(OrderScheduleRow)