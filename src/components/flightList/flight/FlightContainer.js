import React from 'react'
import { connect } from 'react-redux'
import PropTypes, { number, string } from 'prop-types'
import { ItemTypes } from '../../../constants/item-types';
import { DropTarget } from 'react-dnd';
import { flightByIdSelector } from '../../../selectors/index'
import FlightView from './FlightView'

const flightTarget = {    
	canDrop() {
        return true
	},

	drop(props) {
        return { id: props.flight.id, type: ItemTypes.FLIGHT };
    }
}

const collect = (connect,monitor) => {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: !!monitor.isOver(),
		canDrop: !!monitor.canDrop(),
	}
}

export function FlightContainer({ flight, connectDropTarget, isOver, canDrop, onRemove }) {
    return connectDropTarget(
        <div>
            <FlightView 
                flight={flight}
                isOver={isOver}
                canDrop={canDrop}
                onRemove={onRemove}
            />
        </div>
    )
}

FlightContainer.propTypes = {
    flight: PropTypes.shape({ 
        id: number, 
        name: string,
        tailId: number,
        from: PropTypes.object,
        to: PropTypes.object,
        fromIata: PropTypes.string,
        toIata: PropTypes.string,
        dateTakeOff: PropTypes.object,
        dateLanding: PropTypes.object,
        status: string,
        linkedFlightId: number,
    }),
    connectDropTarget: PropTypes.func,
    isOver: PropTypes.bool,
    canDrop: PropTypes.bool,
    onRemove: PropTypes.func,
}

export default connect((state, ownProps) => ({
    flight: flightByIdSelector(state, ownProps),
}))(DropTarget([ItemTypes.TAIL, ItemTypes.ORDER], flightTarget, collect)(FlightContainer))