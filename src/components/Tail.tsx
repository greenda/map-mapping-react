import React, { Component } from 'react';
import { ConnectDragSource, 
    DragSource, DragSourceConnector, DragSourceMonitor, DragSourceCollector, ConnectDragPreview } from 'react-dnd';
import { ItemTypes } from '../constants/item-types';

    const tailSource = {
        beginDrag(props: TailProps) {
        return {...props};
        },
        endDrag(props: TailProps, monitor: DragSourceMonitor) {
            props.addTailAction(props, monitor.getDropResult().id);
        },
    };
    

    const collect: DragSourceCollector<CollectedProps> = (
        connect: DragSourceConnector,
        monitor: DragSourceMonitor,
    ) => ({
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
    })

    export interface TailProps {
        id: string,
        name: string,   
        addTailAction: Function,     
    }

    interface CollectedProps {
        connectDragSource: ConnectDragSource,
        connectDragPreview: ConnectDragPreview,
        isDragging?: boolean,
    }
    
  
    class Tail extends React.Component<TailProps & CollectedProps> {
        render() {
            const { connectDragSource, isDragging } = this.props;
            return connectDragSource(
                <div className="tails__item" id={this.props.id}>{this.props.name}</div>
            )
        }
    }

  export default DragSource(ItemTypes.TAIL, tailSource, collect)(Tail);  