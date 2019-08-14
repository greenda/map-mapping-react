import React from 'react'
import { connect } from 'react-redux'
import PropTypes, { number, string } from 'prop-types'
import moment from 'moment'
import { 
    maxTimeSelector, 
    licencedAirportsSelector, 
    fuelCostSelector,
    distanceBetweenAirportsSelector,
    filteredFlightIdsSelector,
    maxFlightIdSelector,
} from '../../selectors/index'
import { addFlight, addEmptyFlight, removeFlight } from '../../actions/pageActions'
import FlightListView from './FlightListView'

export function FlightListContainer({
    flightIds, 
    airports,
    maxFlightId,
    maxTime, 
    airportDistances,
    fuelCost,
    addFlight,
    addEmptyFlight,
    removeFlight
    }) { 
        return (
            <FlightListView 
                flightIds={flightIds}
                airports={airports}
                maxFlightId={maxFlightId}
                maxTime={maxTime}
                airportDistances={airportDistances}
                fuelCost={fuelCost}
                addFlight={addFlight}
                addEmptyFlight={addEmptyFlight}
                removeFlight={removeFlight} />
        )
}

FlightListContainer.propTypes = {
    flightIds: PropTypes.arrayOf(number),
    airports: PropTypes.arrayOf(
        PropTypes.shape({ 
            id: number,
            name: string,
            iata: string,
            countriesId: number,
            latt: number,
            longt: number,
            costOnHour: number,
        })
    ),
    maxFlightId: number,
    maxTime: PropTypes.instanceOf(moment),
    airportDistances: PropTypes.func,
    fuelCost: number,
    addFlight: PropTypes.func,
    addEmptyFlight: PropTypes.func,
    removeFlight: PropTypes.func,
}

export default connect(
    (state) => ({        
        flightIds: filteredFlightIdsSelector(state),
        airports: licencedAirportsSelector(state),    
        maxTime: maxTimeSelector(state),
        airportDistances: distanceBetweenAirportsSelector(state),
        fuelCost: fuelCostSelector(state),
        maxFlightId: maxFlightIdSelector(state),
    }),
    { addFlight, addEmptyFlight, removeFlight }
)(FlightListContainer)
