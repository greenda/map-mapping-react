import React from 'react'
import PropTypes, { number, string } from 'prop-types'
import moment from 'moment'
import { CELL_WIDTH_SCALE, TIMELINE_OFFSET_HOURS } from '../../constants/schedule'
import OrderScheduleRowContainer from './order-schedule-row/OrderScheduleRowContainer';
import './OrderScheduleView.scss'

export function OrderScheduleView({ orderSchedule, currentTime }) {
    const maxRowIndex = 
        orderSchedule.length > 0 ? Math.max(...orderSchedule.map(cell => cell.rowIndex)) : 0
    const rows = Array(maxRowIndex + 1).fill('').map((_, rowIndex) => {
        const cells = orderSchedule.filter(cell => cell.rowIndex === rowIndex)
        return (
            <OrderScheduleRowContainer
                key={rowIndex}
                leftOffset={TIMELINE_OFFSET_HOURS * CELL_WIDTH_SCALE}
                rowIndex={rowIndex}
                isLast={maxRowIndex === rowIndex} 
                orders={cells}
                currentTime={currentTime}
                timelineOffsetHours={TIMELINE_OFFSET_HOURS}
                cellWidthScale={CELL_WIDTH_SCALE} />
        )
    })
    return (
        <div className="schedule__container order-schedule__container">
             <div className="schedule__rows" >
                {rows}
             </div>
        </div>
    )
}

OrderScheduleView.propTypes = {
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

export default OrderScheduleView