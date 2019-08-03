import React, { useState } from 'react'
import PropTypes, { number, string, func } from 'prop-types'
import LicenceItem from './licence-item/LicenceItem'
import aircraftIcon from '../../assets/aircraft-icon__red.svg'
import { aircraftCost } from '../../constants/tails'
import './StoreView.scss'

export function StoreView({ licences, images, addLicence, addTail, currentBudget, airports }) {
    const [airportId, setAirportId] = useState(1);
    const sortedAirports = [...airports].sort((a, b) => (a.iata < b.iata) ? -1: 1)
    const onAirportIdChange = (event) => {
        const newAirportId = +event.target.value;
        setAirportId(newAirportId)
    }

    return (
        <div className="store__container">
            <div className="store__licence-title">Licences:</div>
                <div className="store__licences-container">
                {licences.map(licence => (
                    <LicenceItem 
                        key={licence.id} 
                        licence={licence} 
                        addLicence={addLicence}
                        currentBudget={currentBudget}
                        image={images[licence.imageKey]}/>
                ))}
            </div>
            <div className="store__aircrafts-title">Aircrafts:</div>
            <div className={`store__aircrafts-buy-button-container ${ currentBudget < aircraftCost ? 'without-button' : ''}`}>
                <div className={`store__aircrafts-buy-button ${ currentBudget < aircraftCost ? 'hidden' : ''}`}
                    onClick={() => addTail(airportId, aircraftCost)}>Buy aircraft</div>
                <div className="store__aircrafts-icon-container ">
                    <div className={`store__aircrafts-cost ${currentBudget < aircraftCost ? 'inactive' : ''}`}>
                        {aircraftCost} ☼
                    </div>
                    <select className="airport-selector" value={airportId} onChange={onAirportIdChange}>
                        {sortedAirports.map(airport => <option value={airport.id} key={airport.id}>{airport.iata}</option>)}
                    </select>
                    <img className="store__aircrafts-icon" width="40" height="40" src={aircraftIcon} alt="aircrfat for buy"/>
                </div>
            </div>
        </div>
    )
}

StoreView.propTypes = {
    licences: PropTypes.arrayOf(PropTypes.shape({
        id: number,
        regionIds: PropTypes.arrayOf(number),
        name: string,
        imageKey: string,
        cost: number,
    })),
    addLicence: func,
    addTail: func,
    currentBudget: number,
    images: PropTypes.object,
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
}

export default StoreView