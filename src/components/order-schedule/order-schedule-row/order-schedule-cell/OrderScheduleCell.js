import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes, { number, string } from 'prop-types'
import moment from 'moment'
import { getCellProperties } from '../../../../helpers/ScheduleHelper'
import './OrderScheduleCell.scss'

export function OrderScheduleCell({ order, cellWidthScale, currentTime, timelineOffsetHours }) {
    const { leftOffset, cellWidth } = 
        getCellProperties(cellWidthScale, timelineOffsetHours, currentTime, order.dateTakeOff, order.dateLanding)
    
    return (
        <div className="order-flight-cell order-cell" style={{left: leftOffset, width: cellWidth}}>
            <div className="order-flight-cell__content">
                <Tooltip disableFocusListener title={`${order.name} ${order.from.iata} - ${order.to.iata}`} placement="top">
                    <span className="order-flight-cell__label" >{order.name}</span>                
                </Tooltip>
                <span className="order-flight-cell__airports" >{`${order.from.iata} - ${order.to.iata}`}</span>                
            </div>
        </div>
    )
}

OrderScheduleCell.propTypes = {
    order: PropTypes.shape({
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
    }), 
    cellWidthScale: number,
    currentTime: PropTypes.instanceOf(moment),
    timelineOffsetHours: number,
}


export default OrderScheduleCell