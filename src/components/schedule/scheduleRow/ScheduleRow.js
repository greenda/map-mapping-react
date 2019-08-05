import React from 'react'
import PropTypes, { number, string, object } from 'prop-types'
import moment from 'moment'
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../../../constants/item-types';
import FlightCell from './flightCell/FlightCell'
import BudgetCell from './budgetCell/BudgetCell'
import './ScheduleRow.scss'

export function ScheduleRow({
    tail, flights, cellWidthScale, currentTime, 
    budgetChains, timelineOffsetHours, 
    addApproachFlight, blankApproachFlight,
    connectDropTarget, isLast, isOver, canDrop, leftOffset }) {
    
    const tailBudgetChains = budgetChains.filter(budgetChain => budgetChain.tailId === tail.id)
    const budgetChainRows = tailBudgetChains.map((chainElement) => {
         return (
            <BudgetCell
                key={`budget${chainElement.id}`} 
                flights={flights}
                chainElement={chainElement}
                cellWidthScale={cellWidthScale}
                currentTime={currentTime}
                timelineOffsetHours={timelineOffsetHours}
            />)
    }) 

    const flightCels = flights.filter(flight => flight.tailId === tail.id).map(flight => {
        return (<FlightCell 
                    key={`flight${flight.id}`}
                    flight={flight}
                    cellWidthScale={cellWidthScale}
                    currentTime={currentTime}
                    timelineOffsetHours={timelineOffsetHours}
                    addApproachFlight={addApproachFlight}
                    blankApproachFlight={blankApproachFlight}
        />)
    })        
    return connectDropTarget(
        <div key={`tail${tail.id}`} 
            className={`schedule__row 
                ${ isLast ? 'last' : ''}
                ${isOver && canDrop ? 'enableDrop' : ''}
                ${isOver && !canDrop ? 'disableDrop' : ''} 
            `}>
            {flightCels}
            {budgetChainRows}
            <div className="tail-name">{`${tail.name} ${tail.airport ? tail.airport.iata : ''}`}</div>
            <div className="schedule__timeline" style={{left: `${leftOffset}px`}}></div>
        </div>
    )
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

ScheduleRow.propTypes = {
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

export default DropTarget([ItemTypes.ORDER], rowTarget, collect)(ScheduleRow)