import React from 'react';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../../../constants/item-types';
import './Tail.scss'

const tailSource = {
    beginDrag(props) {
        // TODO только нужные поля
        return {tail: {...props.tail}, type: ItemTypes.TAIL};
    },
    endDrag(props, monitor) {
        if (monitor.getDropResult() && monitor.getDropResult().id) {
            props.addTailAction(props.tail, monitor.getDropResult().id);
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

// TODO PropTypes

export function Tail({tail, connectDragSource}) {
    const { id, name, airport } = tail
    return connectDragSource(
        <div className="tails__item" id={id}>
            <span className="tails__item__name">{name}</span>
            <span className="tails__item__airport"> {airport ? airport.iata : ''} </span>            
        </div>
    )        
}

export default DragSource(ItemTypes.TAIL, tailSource, collect)(Tail);  