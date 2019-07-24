import React from 'react'
import { connect } from 'react-redux'
import PropTypes, { number, string, object, func } from 'prop-types'
import { DragSource } from 'react-dnd'
import moment from 'moment'
import { orderByIdSelector } from '../../../selectors/index'
import { ItemTypes } from '../../../constants/item-types'
import useToggler from '../../../common/custom-hooks/toogle-open'
import './Order.scss'

const orderSource = {
    beginDrag(props) {
        return {orderId: props.order.id, type: ItemTypes.ORDER };
    },
    endDrag(props, monitor) {
        if (monitor.getDropResult() && monitor.getDropResult().id) {
            props.addOrder(props.order.id, monitor.getDropResult().id);
        }
    },
};

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
})

export function Order({ order, connectDragSource }) {
    const { name, from, to, progress, dateTakeOff, dateLanding, pay, cost } = order
    const { expanded, toggleExpanded } = useToggler(false)

    return connectDragSource(
        <div className={`order__container ${progress > 100 ? 'ended' : ''}`}>
            <div className="order__header">
                <div className="order__header__row">
                    <div className="order__name">{name}</div>
                    <div className="order__expand-button" 
                        onClick={toggleExpanded}>{expanded ? '-' : '+'}</div>
                </div>
                <div className="order__header__row left">
                    <div>{from.iata} - {to.iata}</div>
                </div>
                <div className="order__header__row left">
                    <div>cost: {cost}, pay: {pay}</div>
                </div>
                <div className="small-font">
                    <div>{`${dateTakeOff.format('DD.MM HH:mm')} - 
                           ${dateLanding.format('DD.MM HH:mm')}`}</div>
                </div>                
            </div>
            
            {getDetails(expanded, order)}
        </div>
    )
}

function getDetails(expanded, order) {
    return (expanded && order.description) ? (<div className="order__description">{order.description}</div>) : (<div></div>)
}

Order.propTypes = {
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
    flight: PropTypes.shape({ 
        id: number, 
        name: string,
        tailId: number,
        from: object,
        to: object,
        fromIata: string,
        toIata: string,
        dateTakeOff: object,
        dateLanding: object,
        status: string
    }),
    addOrder: func,    
    connectDragSource: func, 
}

export default connect(
        (state, ownProps) => ({
            order: orderByIdSelector(state, ownProps),
        }),
)(DragSource(ItemTypes.ORDER, orderSource, collect)(Order))
