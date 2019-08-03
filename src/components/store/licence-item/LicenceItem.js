import React from 'react'
import PropTypes, { number, string, func } from 'prop-types'
import './LicenceItem.scss'

export function LicenceItem({ licence, image, addLicence, currentBudget }) {
    return (
        <div className="licence-item">
            <div className="licence-item__name-column">
                <div className="licence-item__name">{licence.name}</div>
                {!licence.isActive && currentBudget < licence.cost ? (
                    <div className="licence-item__cost inactive">{licence.cost}☼</div>) :  (<></>)}
                {!licence.isActive && currentBudget >= licence.cost ? (
                    <div>
                        <div className="licence-item__cost">{licence.cost}☼</div>
                        <div className="licence-item__buy-button" onClick={() => addLicence(licence)}>Buy licence</div>
                    </div>
                ) :  (<></>)}
                {licence.isActive ? (<div className="licence-item__active-licence">✓</div>) : (<></>)}                
            </div>            
            <div className="licence-item__icon">
                <img src={image} alt="region map"></img>   
            </div>        
        </div>
    )
}

LicenceItem.propTypes = {
    licence: PropTypes.shape({
        id: number,
        regionIds: PropTypes.arrayOf(number),
        name: string,
        imageKey: string,
        cost: number,
    }),
    addLicence: func,
    currentBudget: number,
    image: string,
}

export default LicenceItem