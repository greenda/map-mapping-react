import React from 'react'
import PropTypes, { number, string, object } from 'prop-types'
import moment from 'moment'
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../../../constants/item-types';
import ScheduleRowView from './ScheduleRowView'

export function ScheduleRowContainer({
    tail, flights, cellWidthScale, currentTime, 
    budgetChains, timelineOffsetHours, 
    addApproachFlight, blankApproachFlight,
    connectDropTarget, isLast, isOver, canDrop, leftOffset }) {
    return connectDropTarget(
        <div className="schedule__drop-container">
            <ScheduleRowView 
                tail={tail}
                flights={flights}
                cellWidthScale={cellWidthScale}
                currentTime={currentTime}
                budgetChains={budgetChains}
                timelineOffsetHours={timelineOffsetHours}
                addApproachFlight={addApproachFlight}
                blankApproachFlight={blankApproachFlight}
                isLast={isLast}
                isOver={isOver}
                canDrop={canDrop}
                leftOffset={leftOffset}
            />
        </div>
    )
}

ScheduleRowContainer.propTypes = {
    tail: PropTypes.shape({
        airportId:number,
        id: number,
        name: string,
        progress: number,
    }),
    flights: PropTypes.arrayOf(PropTypes.shape({
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
    })),
    cellWidthScale: number,
    currentTime: PropTypes.instanceOf(moment),
    timelineOffsetHours: number,
    addApproachFlight: PropTypes.func,
    blankApproachFlight: PropTypes.func,
    connectDropTarget: PropTypes.func,
    isLast: PropTypes.bool,
    isOver: PropTypes.bool,
    canDrop: PropTypes.bool,
    leftOffset: number,
}

const rowTarget = {    
	canDrop() {
        return true
	},

	drop(props) {
        return { id: props.tail.id, type: ItemTypes.SCHEDULE };
    }
}

const collect = (connect, monitor) => {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: !!monitor.isOver(),
		canDrop: !!monitor.canDrop(),
	}
}

export default DropTarget([ItemTypes.ORDER], rowTarget, collect)(ScheduleRowContainer)