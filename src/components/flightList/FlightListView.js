import React from 'react'
import PropTypes, { number, string } from 'prop-types'
import moment from 'moment'
import FlightContainer from './flight/FlightContainer'
import AddFlightPanel from './add-flight-panel/AddFlightPanel'
import useToggler from '../../common/custom-hooks/toogle-open'
import './FlightListView.scss'

export function FlightListView({
    flightIds, 
    airports,
    maxFlightId,
    maxTime, 
    airportDistances,
    fuelCost,
    addFlight,
    addEmptyFlight,
    removeFlight}) {      
    const { expanded: isAddPanel, setExpanded: setIsAddPanel } = useToggler()
    const onSave = (newFlight) => {
        addFlight(newFlight)
        setIsAddPanel(false)
    }
    const onCancel = () => {
        setIsAddPanel(false)
    }
   
    return (
        <div className="flight-list-container">
            {getAddButtons(isAddPanel, maxFlightId, addEmptyFlight, setIsAddPanel)}
            {getAddPanel(
                    isAddPanel, 
                    airports,  
                    maxFlightId, 
                    maxTime,
                    fuelCost,
                    airportDistances,
                    onSave,
                    onCancel
                    )}
            {getFlights(isAddPanel, flightIds, removeFlight)}     
        </div>
    )
}

function getAddButtons(isAddPanel, maxFlightId, addEmptyFlight, setIsAddPanel) {
    if (!isAddPanel) {
        return (
            <div className="flight-list-container__add-buttons">
                <input className="add-button" 
                        type="button" 
                        value="Add empty" 
                        onClick={() => addEmptyFlight(maxFlightId + 1)} />
                    {!isAddPanel ? 
                        (<input className="add-button" 
                                type="button"
                                value="Add custom flight"
                                onClick={() => setIsAddPanel(true)}/>) : ''}
            </div>
        ) 
    }
    
    return (<div></div>)
}

function getFlights(isAddPanel, flightIds, removeFlight) {
    const flights = flightIds.map(value => (
        <FlightContainer key={value} id={value} onRemove={(id) => removeFlight(id)}/>)
    )

    if (!isAddPanel) {
        return (<div className="flight-list-container__flights">
        {flights}
        </div>)
    }
    return (<div></div>)
}

function getAddPanel(isAddPanel, airports, maxFlightId, 
    maxTime, fuelCost, airportDistances, onSaveCallback, onCancelCallback) {
    if (isAddPanel) {
        return (
            <div className="flight-list-container__add-panel">
                <AddFlightPanel 
                    airports={airports} 
                    maxFlightId={maxFlightId}
                    maxTime={maxTime}
                    onCancel={onCancelCallback}
                    onSave={onSaveCallback} 
                    fuelCost={fuelCost}
                    airportDistances={airportDistances}/>
            </div>
        )
    } 
    return (<div></div>)
}

FlightListView.propTypes = {
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

export default FlightListView

