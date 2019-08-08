import React from 'react'
import PropTypes, { number, string } from 'prop-types'
import moment from 'moment'
import ScheduleRowContainer from './scheduleRow/ScheduleRowContainer'
import { CELL_WIDTH_SCALE, TIMELINE_OFFSET_HOURS } from '../../constants/schedule'
import './ScheduleTableView.scss'

export function ScheduleTableView({
    tails, flights, 
    currentTime, budgetChains,
    addApproachFlight, blankApproachFlight}) { 
    const tailsCount = tails.length
    const tailRows = tails.map((tail, i) => (
            <ScheduleRowContainer
                tail={tail} 
                key={`tail${tail.id}`}
                flights={flights}
                leftOffset={TIMELINE_OFFSET_HOURS * CELL_WIDTH_SCALE}
                isLast={(tailsCount - 1) === i}
                currentTime={currentTime}
                budgetChains={budgetChains}
                addApproachFlight={addApproachFlight}
                blankApproachFlight={blankApproachFlight}
                timelineOffsetHours={TIMELINE_OFFSET_HOURS}
                cellWidthScale={CELL_WIDTH_SCALE} /> )  
    )
    
    return (
        <div className="schedule__container">            
            <div className="schedule__rows">{tailRows}</div>        
        </div>
    )
}

ScheduleTableView.propTypes = {
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
    budgetChains: PropTypes.arrayOf(PropTypes.shape({
        ids: PropTypes.arrayOf(number),
        tailId: number,
    })),
    addApproachFlight: PropTypes.func,
    blankApproachFlight: PropTypes.func,
}

export default ScheduleTableView