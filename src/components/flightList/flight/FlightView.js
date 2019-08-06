import React from 'react'
import PropTypes, { number, string } from 'prop-types'
import useToggler from '../../../common/custom-hooks/toogle-open'
import ProgressBar from './progress-bar/ProgressBar'
import './FlightView.scss'

export function FlightView({ flight, isOver, canDrop, onRemove }) {
    const { expanded, toggleExpanded } = useToggler(false)
    const { id, name, from, to, progress, status, dateTakeOff, dateLanding, tail } = flight    

    return (
        <div className={`flight__container 
            ${isOver && canDrop ? 'enableDrop' : ''}
            ${isOver && !canDrop ? 'disableDrop' : ''}
            ${progress > 100 ? 'ended' : ''}
            ${progress === -1 && status === 'canceled' ? 'canceled' : ''}`
            }>
            <div className="flight__header">
                <div className="flight__header__row">
                    <div className="flight__name">{name}</div>
                    <div  className="flight__control-buttons">
                        <div className="flight__expand-button" onClick={toggleExpanded}>
                            {expanded ? '-' : '+'}
                        </div>
                        <div className="flight__expand-button" onClick={() => onRemove(id)}>x</div>
                    </div>                    
                </div>
                <div className="flight__header__row left">
                    <div>{from.iata && to.iata ? `${from.iata} - ${to.iata}` : '' }</div>
                    <div>{tail ? tail.name : null }</div>                    
                </div>
                <div className="small-font">  
                    <div>{dateTakeOff && dateLanding ? 
                        `${dateTakeOff.format('DD.MM HH:mm')} - ${dateLanding.format('DD.MM HH:mm')}` : ''}</div>
                </div>                
            </div>            
            {getDetails(expanded, flight)}
        </div>
    )
}

function getDetails(expanded, flight) {
    if (expanded) {
        const {  status, progress, pay, cost, description } = flight
        return (
            <div>
                <div>cost: {cost}</div>
                <div>pay: {pay}</div>   
                <div className="flight__description">{description}</div>             
                <div>{progress >= 0 ? Math.floor(progress) : null}</div>            
                    <ProgressBar progress={progress}/>
                <div>{status}</div>
            </div>
            )
    } else {
        return (<div></div>)
    }
}

FlightView.propTypes = {
    flight: PropTypes.shape({ 
        id: number, 
        name: string,
        tailId: number,
        from: PropTypes.object,
        to: PropTypes.object,
        fromIata: PropTypes.string,
        toIata: PropTypes.string,
        dateTakeOff: PropTypes.object,
        dateLanding: PropTypes.object,
        status: string,
        linkedFlightId: number,
    }),
    isOver: PropTypes.bool,
    canDrop: PropTypes.bool,
    onRemove: PropTypes.func,
}

export default FlightView
