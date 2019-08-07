import React from 'react'
import { connect } from 'react-redux'
import PropTypes, { number, string, func } from 'prop-types'
import { DragSource } from 'react-dnd'
import moment from 'moment'
import { ItemTypes } from '../../../constants/item-types'
import { orderByIdSelector } from '../../../selectors/index'
import OrderView from './OrderView'

export function OrderContainer({ order, connectDragSource }) {    
    return connectDragSource(
        <div>
            <OrderView order={order}/>
        </div>
    )
}

OrderView.propTypes = {
    id: number,
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
    }),
    addOrder: func,    
    maxFlightId: number,
    createFlightFromOrder: func,
    connectDragSource: func,     
}

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

export default connect(
    (state, ownProps) => ({
        order: orderByIdSelector(state, ownProps),
    }),
)(DragSource(ItemTypes.ORDER, orderSource, collect)(OrderContainer))

