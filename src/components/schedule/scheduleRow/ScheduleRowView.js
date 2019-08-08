import React from 'react'
import PropTypes, { number, string, object } from 'prop-types'
import moment from 'moment'
import FlightCell from './flightCell/FlightCell'
import BudgetCell from './budgetCell/BudgetCell'
import './ScheduleRowView.scss'

export function ScheduleRowView({
    tail, flights, cellWidthScale, currentTime, 
    budgetChains, timelineOffsetHours, 
    addApproachFlight, blankApproachFlight,
    isLast, isOver, canDrop, leftOffset }) {
    
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
    return (
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

ScheduleRowView.propTypes = {
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
    isLast: PropTypes.bool,
    isOver: PropTypes.bool,
    canDrop: PropTypes.bool,
    leftOffset: number,
}

export default ScheduleRowView