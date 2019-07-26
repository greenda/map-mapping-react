import React from 'react'
import PropTypes, { number, string, object } from 'prop-types'
import moment from 'moment'
import FlightCell from './flightCell/FlightCell'
import BudgetCell from './budgetCell/BudgetCell'
import './ScheduleRow.scss'

export function ScheduleRow({
    tails, flights, cellWidthScale, currentTime, 
    budgetChains, timelineOffsetHours, 
    addApproachFlight, blankApproachFlight}) {
    const tailsCount = tails.length
    const tailRows = tails.map((tail, i) => {
        const tailBudgetChains = budgetChains.filter(budgetChain => budgetChain.tailId === tail.id)
        const budgetChainRows = tailBudgetChains.map((budgetChain, chainIndex) => {
            return (
                <BudgetCell
                    key={`budget${budgetChain.id}`} 
                    flights={flights}
                    budgetChain={budgetChain}
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
            <div key={`tail${tail.id}`} className={`schedule__row ${(tailsCount - 1) === i ? 'last' : ''}`}>
                {flightCels}
                {budgetChainRows}
            </div>
        )
    })

    return (<div className="schedule__rows">{tailRows}</div>)
}

ScheduleRow.propTypes = {
    tails: PropTypes.arrayOf(
        PropTypes.shape({
            airportId:number,
            id: number,
            name: string,
            progress: number,
        })
    ),
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
}

export default ScheduleRow