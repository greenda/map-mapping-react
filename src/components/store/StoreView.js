import React from 'react'
import PropTypes, { number, string, func } from 'prop-types'
import LicenceItem from './licence-item/LicenceItem'
import './StoreView.scss'

export function StoreView({ licences, images, addLicence, currentBudget }) {
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
    currentBudget: number,
    images: PropTypes.arrayOf(PropTypes.object)
}

export default StoreView