
import React from 'react'
import PropTypes, { number, string } from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import {
    tailCoordinates,
    flightsSelector,
    currentTimeSelector,
    budgetChainsElementsSelector,
    approachFlightBlancSelector,
} from '../../selectors/index'
import { addApproachFlight } from '../../actions/pageActions'
import ScheduleTableView from './ScheduleTableView'

export function ScheduleTableContainer({ tails, flights, 
    currentTime, budgetChains,
    addApproachFlight, blankApproachFlight }) { 
        return (
            <ScheduleTableView 
                tails={tails}
                flights={flights}
                currentTime={currentTime}
                budgetChains={budgetChains}
                addApproachFlight={addApproachFlight}
                blankApproachFlight={blankApproachFlight}
            />
        )
}

ScheduleTableContainer.propTypes = {
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

export default connect(
    (state) => ({
        tails: tailCoordinates(state),
        flights: flightsSelector(state),
        currentTime: currentTimeSelector(state),
        budgetChains: budgetChainsElementsSelector(state),  
        blankApproachFlight: approachFlightBlancSelector(state),  
    }),{ addApproachFlight })(ScheduleTableContainer)
