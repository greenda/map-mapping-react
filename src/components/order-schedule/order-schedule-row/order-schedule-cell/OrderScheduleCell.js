import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes, { number, string } from 'prop-types'
import moment from 'moment'
import { DragSource } from 'react-dnd'
import { ItemTypes } from '../../../../constants/item-types'
import { getCellProperties } from '../../../../helpers/ScheduleHelper'
import './OrderScheduleCell.scss'

const orderSource = {
    beginDrag(props) {
        return {orderId: props.order.id, type: ItemTypes.ORDER };
    },
    endDrag(props, monitor) {
        const dropResult = monitor.getDropResult()
        if (dropResult && dropResult.type === ItemTypes.FLIGHT && dropResult.id) {
            props.addOrder(props.order.id, monitor.getDropResult().id);
        }

        if (dropResult && dropResult.type === ItemTypes.SCHEDULE && dropResult.id) {
            props.createFlightFromOrder(
                props.order.id, 
                props.maxFlightId + 1,
                monitor.getDropResult().id);
        }
    },
};

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
})

export function OrderScheduleCell({ order, cellWidthScale, currentTime, timelineOffsetHours, connectDragSource }) {
    const { leftOffset, cellWidth } = 
        getCellProperties(cellWidthScale, timelineOffsetHours, currentTime, order.dateTakeOff, order.dateLanding)
    
    return connectDragSource(
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
    createFlightFromOrder: PropTypes.func,
    addOrder: PropTypes.func,
    maxFlightId: number,
    connectDragSource: PropTypes.func,
}


export default DragSource(ItemTypes.ORDER, orderSource, collect)(OrderScheduleCell)