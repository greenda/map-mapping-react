import React from 'react';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../../../constants/item-types';
import './Tail.scss'

const tailSource = {
    beginDrag(props) {
        return {...props};
    },
    endDrag(props, monitor) {
        if (monitor.getDropResult() && monitor.getDropResult().id) {
            props.addTailAction(props, monitor.getDropResult().id);
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

export function Tail({tail, addTailAction, connectDragSource}) {
    const { id, name, airportId } = tail
    return connectDragSource(
        <div className="tails__item" id={id}>{name} {airportId} </div>
    )        
}

export default DragSource(ItemTypes.TAIL, tailSource, collect)(Tail);  