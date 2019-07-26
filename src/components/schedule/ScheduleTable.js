import React from 'react'
import PropTypes, { number, string } from 'prop-types'
import moment from 'moment'
import ScheduleRow from './scheduleRow/ScheduleRow'
import './ScheduleTable.scss'

const CELL_WIDTH_SCALE = 20
const TIMELINE_OFFSET_HOURS = 2

export function ScheduleTable({tails, flights, currentTime, addApproachFlight, blankApproachFlight}) {    
    const budgetChains = [
        {
            ids: [2, 3],
            tailId: 2,
        }
    ]

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
}

export default ScheduleTable