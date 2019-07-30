import React from 'react'
import PropTypes, { number, string } from 'prop-types'
import moment from 'moment'
import ScheduleRow from './scheduleRow/ScheduleRow'
import { CELL_WIDTH_SCALE, TIMELINE_OFFSET_HOURS } from '../../constants/schedule'
import './ScheduleTable.scss'

export function ScheduleTable({
    tails, flights, 
    currentTime, budgetChains,
    addApproachFlight, blankApproachFlight}) {    

    return (
        <div className="schedule__container">
            <ScheduleRow 
                tails={tails} 
                flights={flights}
                currentTime={currentTime}
                budgetChains={budgetChains}
                addApproachFlight={addApproachFlight}
                blankApproachFlight={blankApproachFlight}
                timelineOffsetHours={TIMELINE_OFFSET_HOURS}
                cellWidthScale={CELL_WIDTH_SCALE} />            
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
    budgetChains: PropTypes.arrayOf(PropTypes.shape({
        ids: PropTypes.arrayOf(number),
        tailId: number,
    }))
}

export default ScheduleTable