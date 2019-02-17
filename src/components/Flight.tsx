import * as React from 'react'
import {
	DropTarget,
	DropTargetMonitor,
	DropTargetConnector,
	DropTargetCollector,
	ConnectDropTarget,
} from 'react-dnd';
import { ItemTypes } from '../constants/item-types';

interface CollectedProps {
	isOver: boolean
	canDrop: boolean
	connectDropTarget: ConnectDropTarget
}

export interface FlightProps {
  id: string,
  name: string,
}

const flightTarget = {
	// canDrop(props: FlightProps) {
	// 	return canMoveKnight(props.x, props.y)
	// },

	drop(props: FlightProps, monitor: DropTargetMonitor) {
    return { ...props };
	},
}

const collect: DropTargetCollector<CollectedProps> = (
	connect: DropTargetConnector,
	monitor: DropTargetMonitor,
) => {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: !!monitor.isOver(),
		canDrop: !!monitor.canDrop(),
	}
}

class Flight extends React.Component<FlightProps & CollectedProps> {
  public render() {
    const { id, name, connectDropTarget, isOver, canDrop, children } = this.props

    return connectDropTarget(
      <div className="flights__item">{name}</div>
    )
  }
}

export default DropTarget(ItemTypes.TAIL, flightTarget, collect)(Flight)


