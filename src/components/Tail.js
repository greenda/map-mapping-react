import React from 'react';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../constants/item-types';

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

    // export interface TailProps {
    //     id: string,
    //     name: string,   
    //     addTailAction: Function,     
    // }

    // interface CollectedProps {
    //     connectDragSource: ConnectDragSource,
    //     connectDragPreview: ConnectDragPreview,
    //     isDragging?: boolean,
    // }
    

    // TODO в функцию и создать контейнер
    class Tail extends React.Component {
        render() {
            const { connectDragSource, isDragging } = this.props;
            return connectDragSource(
                <div className="tails__item" id={this.props.id}>{this.props.name}</div>
            )
        }
    }

  export default DragSource(ItemTypes.TAIL, tailSource, collect)(Tail);  