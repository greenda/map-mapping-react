import * as React from 'react'
import {
	DropTarget
} from 'react-dnd';
import { ItemTypes } from '../constants/item-types';

// interface CollectedProps {
// 	isOver: boolean
// 	canDrop: boolean
// 	connectDropTarget: ConnectDropTarget
// }

// export interface FlightProps {
//   id: string,
// 	name: string,
// 	tail: { id: string; name: string }
// }

const flightTarget = {
	// canDrop(props: FlightProps) {
	// 	return canMoveKnight(props.x, props.y)
	// },

	drop(props, monitor) {
    return { ...props };
	},
}

const collect = (
	connect,
	monitor,
) => {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: !!monitor.isOver(),
		canDrop: !!monitor.canDrop(),
	}
}

class Flight extends React.Component {
  render() {
    const { name, tail, connectDropTarget } = this.props

    return connectDropTarget(
      <div className="flights__item">{name} {tail ? tail.id : null}</div>
    )
  }
}

export default DropTarget(ItemTypes.TAIL, flightTarget, collect)(Flight)


