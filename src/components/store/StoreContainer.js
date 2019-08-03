import React from 'react'
import { connect } from 'react-redux'
import PropTypes, { number, string, func } from 'prop-types'
import { licencesSelector, currentBudgetSelector, licencedAirportsSelector } from '../../selectors/index'
import { addLicence, addTail }  from '../../actions/pageActions'
import StoreView from './StoreView'
import eurasia from '../../assets/eurasia.png'
import africa from '../../assets/africa.png'
import northAmerica from '../../assets/north_america.png'
import southAmerica from '../../assets/south_america.png'
import australia from '../../assets/australia.png'
import antarctida from '../../assets/antarctica.png'

export function StoreContainer({ licences, addLicence, addTail, currentBudget, airports }) {
    const images = { eurasia, africa, northAmerica, southAmerica, australia, antarctida }
    return (
        <StoreView 
            licences={licences}
            images={images}
            addLicence={addLicence}
            addTail={addTail}
            airports={airports}
            currentBudget={currentBudget}/>
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
    addLicence: func,
    currentBudget: number,
}

export default connect((state) => ({
        licences: licencesSelector(state),
        currentBudget: currentBudgetSelector(state),
        airports: licencedAirportsSelector(state),    
    }), 
    { addLicence, addTail }
)(StoreContainer)
