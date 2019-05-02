import React from 'react'
import { connect } from 'react-redux'
// TODO imports через @
import { flightsOnTime, tailCoordinates } from '../../selectors/index'
import MapView from './MapView'
import { PropTypes } from 'prop-types'

export function MapContainer({flights, tails}) {
    return (
        <MapView flights={flights} tails={tails}/>
    )
}

// MapView.propTypes = {
//     flights: PropTypes.arrayOf(PropTypes.shape({
//         id: PropTypes.number,
//         name: PropTypes.string,
//         tail: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string}),
//         fromIata: PropTypes.string,
//         toIata: PropTypes.string,
//         dateTakeOff: PropTypes.object,
//         dateLanding: PropTypes.object,
//         status: PropTypes.string,
//     }))
// }

export default connect((state) => ({
    tails: tailCoordinates(state),
    flights: flightsOnTime(state),
}))(MapContainer)

