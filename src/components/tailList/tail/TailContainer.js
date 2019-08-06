import React from 'react';
import PropTypes, { number, string } from 'prop-types'
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../../../constants/item-types';
import TailView from './TailView'

const tailSource = {
    beginDrag(props) {
        return {tailId: props.tail.id, type: ItemTypes.TAIL};
    },
    endDrag(props, monitor) {
        if (monitor.getDropResult() && monitor.getDropResult().id) {
            props.addTailAction(props.tail.id, monitor.getDropResult().id);
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

export function TailContainer({tail, connectDragSource}) {
    return connectDragSource(
        <div>
            <TailView tail={tail}/>
        </div>        
    )
}

TailContainer.prototype = {
    tail: PropTypes.shape({
        id: number,
        name: string, 
        airportId: number,
        progress: number,
    }),
    connectDragSource: PropTypes.func,
    addTailAction: PropTypes.func,
}

export default DragSource(ItemTypes.TAIL, tailSource, collect)(TailContainer);  

