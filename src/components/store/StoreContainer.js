import React from 'react'
import { connect } from 'react-redux'
import PropTypes, { number, string, func } from 'prop-types'
import { licencesSelector, currentBudgetSelector } from '../../selectors/index'
import { addLicence }  from '../../actions/pageActions'
import StoreView from './StoreView'
import eurasia from '../../assets/eurasia.png'
import africa from '../../assets/africa.png'
import northAmerica from '../../assets/north_america.png'
import southAmerica from '../../assets/south_america.png'
import australia from '../../assets/australia.png'
import antarctida from '../../assets/antarctica.png'

export function StoreContainer({ licences, addLicence, currentBudget }) {
    const images = { eurasia, africa, northAmerica, southAmerica, australia, antarctida }
    return (
        <StoreView licences={licences} images={images} addLicence={addLicence} currentBudget={currentBudget}/>
    )
}

StoreContainer.propTypes = {
    licences: PropTypes.arrayOf(PropTypes.shape({
        id: number,
        regionIds: PropTypes.arrayOf(number),
        name: string,
        imageKey: string,
        cost: number,
    })),
    addLicence: func,
    currentBudget: number,
}

export default connect((store) => ({
        licences: licencesSelector(store),
        currentBudget: currentBudgetSelector(store),
    }), 
    { addLicence }
)(StoreContainer)
