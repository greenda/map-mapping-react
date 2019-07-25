import React from 'react'
import PropTypes, { number, string } from 'prop-types'
import moment from 'moment'
import './ScheduleTable.scss'

const CELL_WIDTH_SCALE = 10
const TIMELINE_OFFSET_HOURS = 2

export function ScheduleTable({tails, flights, currentTime}) {
    const tailsCount = tails.length
    const tailRows = tails.map((tail, i) => {
        const flightCels = flights.filter(flight => flight.tailId === tail.id).map(flight => {
            
            const leftOffset = CELL_WIDTH_SCALE * (flight.dateTakeOff.diff(currentTime, 'hours') + TIMELINE_OFFSET_HOURS)
            const cellWidth = CELL_WIDTH_SCALE * flight.dateLanding.diff(flight.dateTakeOff, 'hours')
            return (<div key={`flight${flight.id}`} className="order-flight-cell" style={{left: leftOffset, width: cellWidth}}>
                <span className="order-flight-cell__label">{flight.name}</span>
            </div>)
        })
        return (
            <div key={`tail${tail.id}`} className={`schedule__row ${(tailsCount - 1) === i ? 'last' : ''}`}>{flightCels}</div>
        )
    })

    return (
        <div className="schedule__container">
            {tailRows}   
            <div className="schedule__timeline" 
                 style={{left: `${TIMELINE_OFFSET_HOURS * CELL_WIDTH_SCALE}px`}}></div>
        </div>
    )
}

ScheduleTable.propTypes = {
    tails: PropTypes.arrayOf(PropTypes.shape({
        id: number,
        name: string, 
        airportId: number,
        progress: number,
    })),
    flights: PropTypes.arrayOf(PropTypes.shape({
        id: number, 
        name: string,
        tailId: number,
        from: PropTypes.object,
        to: PropTypes.object,
        fromIata: PropTypes.string,
        toIata: PropTypes.string,
        dateTakeOff: PropTypes.object,
        dateLanding: PropTypes.object,
        status: string
    })),
    currentTime: PropTypes.instanceOf(moment),
}

export default ScheduleTable