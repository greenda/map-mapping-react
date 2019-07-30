import React from 'react'
import PropTypes, { number, string } from 'prop-types'
import moment from 'moment'
import OrderScheduleCell from './order-schedule-cell/OrderScheduleCell'
import './OrderScheduleRow.scss'

export function OrderScheduleRow({ orders, cellWidthScale, currentTime, timelineOffsetHours, isLast }) {
    return (
        <div className={`schedule__row order-schedule-row ${isLast ? 'last' : ''}`} >
            {orders.map((order, i) => (
                <OrderScheduleCell 
                    className={`schedule__row ${(orders.length - 1) === i ? 'last' : ''}`} 
                    cellWidthScale={cellWidthScale}
                    currentTime={currentTime}
                    timelineOffsetHours={timelineOffsetHours}
                    key={order.id} order={order}/>)
            )}
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
}

export default OrderScheduleRow