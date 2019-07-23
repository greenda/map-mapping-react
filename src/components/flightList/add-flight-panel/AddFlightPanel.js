import React, { useEffect } from 'react'
import PropTypes, { func, number, string } from 'prop-types'
import moment from 'moment'
import TextField from '@material-ui/core/TextField'
import useAddFlightFrom from './custom-hooks/useAddFlightForm'
import './AddFlightPanel.scss'

// TODO вынести в справочник и привязать к аэропорту
const fuelCost = 100

export function AddFlightPanel({    
    airports, airportDistances,
    maxTime, maxFlightId, onSave, onCancel}) {
    const {inputs, hundleSubmit, hundleCancel, handleInputChange, hundleMaxTimeChange} = 
        useAddFlightFrom(airportDistances, fuelCost, maxTime, maxFlightId, onSave, onCancel)
    useEffect(() => {
        hundleMaxTimeChange()
    }, [maxTime])

    const airportSelect = getAirportSelector(airports)

    return (
        <form className="flight__container" onSubmit={hundleSubmit}>
            <div className="new-flight__header">
                <div className="new-flight__header__row">
                    <div className="new-flight__name">{inputs.name}</div>
                </div>
                <div className="new-flight__header__row">
                    <div className="new-flight__header__row right-offset">
                    <span className="new-flight__label right-offset__large">from:</span> 
                    {airportSelect('fromId', inputs, handleInputChange)}
                </div>
                    <div className="new-flight__header__row right-offset">
                    <span className="new-flight__label">to:</span>
                    {airportSelect('toId', inputs, handleInputChange)}
                    </div>
                </div>
                <div className="new-flight__header__row">
                   <div className="new-flight__label">takeOff: </div>                  
                    <TextField
                        id="datetime-local"
                        type="datetime-local"                         
                        InputProps={{ 
                            disableUnderline: true,
                            style: {fontSize: 14} 
                        }}
                        name="dateTakeOff"
                        value={inputs.dateTakeOff}
                        onChange={handleInputChange}
                    />                        
                </div>                
                <div className="new-flight__header__row">
                        <div className="new-flight__label">landing:</div>
                        <TextField
                            id="datetime-local"
                            type="datetime-local"
                            className="date-input"
                            InputProps={{ 
                                disableUnderline: true,
                                style: {fontSize: 14} 
                            }}
                            name="dateLanding"
                            value={inputs.dateLanding}
                            disabled
                        />    
                </div>
                <div className="new-flight__header__row">
                    <div>
                        <span className="new-flight__label">cost: </span>
                        <span className="new-flight__cost">{inputs.cost}</span> 
                    </div>
                </div>
                <div className="new-flight__control-buttons">
                    <input type="button" value="Cancel" onClick={hundleCancel}/>
                    <input type="submit" value="Save"/>
                </div>                    
            </div>
        </form>
    )
}

const getAirportSelector = (airports) => (type, inputs, handleInputChange) => {
    const sortedAirports = [...airports]
    sortedAirports.sort((a, b) => (a.iata < b.iata) ? -1: 1)
    return (
        <select className="airport-selector" name={type} value={inputs[type]} onChange={handleInputChange}>
            {sortedAirports.map(airport => <option value={airport.id} key={airport.id}>{airport.iata}</option>)}
        </select>
    )
}

AddFlightPanel.propTypes = {
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
    // TODO
    // airportDistances: PropTypes.fun,
    maxTime: PropTypes.instanceOf(moment),
    maxFlightId: number,
    onSave: func,
    onCancel: func,
}

export default (AddFlightPanel)
