import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { maxTimeSelector, airportsSelector } from '../../selectors/index'
import Flight from './flight/Flight'
import AddFlightPanel from './add-flight-panel/AddFlightPanel'
import { addFlight, addEmptyFlight, removeFlight } from '../../actions/pageActions'
import './FlightList.scss'

export function FlightList({flightIds, airports, maxFlightId, addFlight, addEmptyFlight, removeFlight}) {  
    const [isAddPanel, setIsAddPanel] = useState(false)

    const toogleIsAddPanel = () => {
        setIsAddPanel(!isAddPanel)
    }

    const flights = flightIds.map(value => (<Flight key={value} id={value} onRemove={(id) => removeFlight(id)}/>))
    return (
        <div className="flight-list-container">
            {/* Вынести в компонент выше, чтобы эти кнопки не скролились */}
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
            <div>{getAddPanel(
                    isAddPanel, 
                    airports, 
                    addFlight, 
                    maxFlightId, 
                    () => setIsAddPanel(false),
                    () => setIsAddPanel(false))
                  }
            </div>
            <div>{flights}</div>
        </div>
    )
}

function getAddPanel(isAddPanel, airports, addFlight, maxFlightId, onCancelCallback, onSaveCallback) {
    if (isAddPanel) {
        return (
            <AddFlightPanel 
                airports={airports} 
                addFlight={addFlight} 
                maxFlightId={maxFlightId}
                onCancel={onCancelCallback}
                onSave={onSaveCallback} />
        )
    } 
    return (<div></div>)
}

FlightList.propTypes = {
    flightIds: PropTypes.arrayOf(PropTypes.number)
}

export default connect(
    (state) => ({        
        airports: airportsSelector(state),        
    }),
    { addFlight, addEmptyFlight, removeFlight }
)(FlightList)

