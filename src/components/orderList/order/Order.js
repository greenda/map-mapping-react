import React, { useState } from 'react'
import { connect } from 'react-redux'
// import PropTypes, { number, string } from 'prop-types'
import { orderByIdSelector } from '../../../selectors/index'
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../../../constants/item-types';
import './Order.scss'

const orderSource = {
    beginDrag(props) {
        // TODO только нужные поля
        return {order: {...props.order}, type: ItemTypes.ORDER };
    },
    endDrag(props, monitor) {
        console.log('endDrop')
        if (monitor.getDropResult() && monitor.getDropResult().id) {
            props.addOrder(props.order, monitor.getDropResult().id);
        }
    },
};

const collect = (
    connect,
    monitor,
) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
})

export function Order({ order, connectDragSource }) {
    const { name, from, to, progress, dateTakeOff, dateLanding, tail } = order
    const [expanded, setExpanded] = useState(false)

    // TODO кастом хук
    const toggleExpanded = () => {
        setExpanded(!expanded)
    }

    // TODO - прогресс бар в отдельный компонент    
    return connectDragSource(
        <div className={`order__container 
            ${progress > 100 ? 'ended' : ''}`
            }>
            <div className="order__header">
                <div className="order__header__row">
                    <div className="order__name">{name}</div>
                    <div className="order__expand-button" onClick={toggleExpanded}>{expanded ? '-' : '+'}</div>
                </div>
                <div className="order__header__row left">
                    <div>{from.iata} - {to.iata}</div>
                    <div>{tail ? tail.name : null }</div>
                </div>
                <div className="small-font">
                   
                    <div>{dateTakeOff.format('DD.MM HH:mm')} - {dateLanding.format('DD.MM HH:mm')}</div>
                </div>
                
            </div>
            
            {getDetails(expanded, order)}
        </div>
    )
}

function getDetails(expanded, order) {
    if (expanded) {
        return (
            <div>Описание</div>
            )
    } else {
        return (<div></div>)
    }
}

// TODO debounce
// const flightTarget = {
// 	canDrop(props, monitor) {
//         return props.flight.fromId === monitor.getItem().airportId 
//             && monitor.getItem().progress === -1
//             && props.flight.progress === -1
// 	},

// 	drop(props) {
//         return { id: props.flight.id };
//     }
// }

// const collect = (
// 	connect,
// 	monitor,
// ) => {
// 	return {
// 		connectDropTarget: connect.dropTarget(),
// 		isOver: !!monitor.isOver(),
// 		canDrop: !!monitor.canDrop(),
// 	}
// }

// Order.propTypes = {
//     addOrder
//     flight: PropTypes.shape({ 
//         id: number, 
//         name: string,
//         tailId: number,
//         from: PropTypes.object,
//         to: PropTypes.object,
//         fromIata: PropTypes.string,
//         toIata: PropTypes.string,
//         dateTakeOff: PropTypes.object,
//         dateLanding: PropTypes.object,
//         status: string
//     })
// }

export default 
    connect(
        (state, ownProps) => ({
            order: orderByIdSelector(state, ownProps),
        }),
    )(DragSource(ItemTypes.ORDER, orderSource, collect)(Order))
