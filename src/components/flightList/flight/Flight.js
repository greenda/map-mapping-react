import React from 'react'
import { connect } from 'react-redux'
import PropTypes, { number, string } from 'prop-types'
import { flightByIdSelector, flightProgressSelector } from '../../../selectors/index'
import './Flight.css'

export function Flight({ flight }) {
    const { name, fromIata, toIata, dateTakeOff, dateLanding, status, progress = 40 } = flight
    // TODO - прогресс бар в отдельный компонент    
    return (
        <div className="flight__container">
            <div className="flight__name">{name}</div>
            <div>{fromIata}-{toIata}</div>
            <div>{dateTakeOff.format('YYYY-MM-DD HH:mm')}</div>
            <div>{dateLanding.format('YYYY-MM-DD HH:mm')}</div>
            <div>{Math.floor(progress)}</div>
            <div className="progressbar__container">
                <div style={{ width: progress + '%' }} className="progressbar__bar"></div>
            </div>
            <div>{status}</div>
        </div>
    )
}

Flight.propTypes = {
    flight: PropTypes.shape({ 
        id: number, 
        name: string,
        tailId: number,
        from: number,
        to: number,
        fromIata: PropTypes.string,
        toIata: PropTypes.string,
        dateTakeOff: PropTypes.object,
        dateLanding: PropTypes.object,
        status: string
    })
}

export default connect(
    (state, ownProps) => ({
        flight: flightByIdSelector(state, ownProps),
    })
)(Flight)

