import React from 'react'
import PropTypes, { number, string, object } from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment'
import { getCellProperties } from '../../../../helpers/ScheduleHelper'
import { flightStatuses } from '../../../../constants/flight-status'
import './FlightCell.scss'

export function FlightCell({ flight, cellWidthScale, currentTime, timelineOffsetHours, addApproachFlight, blankApproachFlight}) {
    const { leftOffset, cellWidth } = 
        getCellProperties(cellWidthScale, timelineOffsetHours, currentTime, flight.dateTakeOff, flight.dateLanding)

    return (
        <div className={`order-flight-cell
                 ${flight.progress > 0 ? 'inactive' : ''} 
                 ${(flight.progress === -1 && flight.status === flightStatuses.CANCELED) ? 'canceled' : ''}`}
            style={{left: leftOffset, width: cellWidth}}>                
            <div className="order-flight-cell__add-approach-flight"
                    onClick={() => addApproachFlight(blankApproachFlight(flight.id))}>&lt;</div>
            <div className="order-flight-cell__content">
                <Tooltip disableFocusListener title={`${flight.name} ${flight.from.iata} - ${flight.to.iata}`} placement="top">
                    <span className="order-flight-cell__label" >{flight.name}</span>                
                </Tooltip>
                <span className="order-flight-cell__airports" >{`${flight.from.iata} - ${flight.to.iata}`}</span>                
            </div>
        </div>
    )
}

FlightCell.propTypes = {
    flight:PropTypes.shape({
        id: number, 
        name: string,
        tailId: number,
        from: object,
        to: object,
        fromIata: string,
        toIata: string,
        dateTakeOff: object,
        dateLanding: object,
        status: string,
        linkedFlightId: number,
    }),
    cellWidthScale: number,
    currentTime: PropTypes.instanceOf(moment),
    addApproachFlight: PropTypes.func,
    blankApproachFlight: PropTypes.func,
}

export default FlightCell
