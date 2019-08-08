import React from 'react'
import { connect } from 'react-redux'
import PropTypes, { number, string } from 'prop-types'
import moment from 'moment'
import { ordersToScheduleSelector, currentTimeSelector } from '../../selectors/index'
import OrderScheduleView from './OrderScheduleView';

export function OrderScheduleContainer({ orderSchedule, currentTime }) {
    return (
        <OrderScheduleView 
            orderSchedule={orderSchedule}
            currentTime={currentTime}
        />
    )
}

OrderScheduleContainer.propTypes = {
    orderSchedule: PropTypes.arrayOf(PropTypes.shape({
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
    currentTime: PropTypes.instanceOf(moment)
}

export default connect(
    (state) => ({
        orderSchedule: ordersToScheduleSelector(state),
        currentTime: currentTimeSelector(state),
    })
)(OrderScheduleContainer)