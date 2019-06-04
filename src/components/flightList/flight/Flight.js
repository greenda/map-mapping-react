import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes, { number, string } from 'prop-types'
import { flightByIdSelector } from '../../../selectors/index'
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../../../constants/item-types';
import './Flight.scss'

export function Flight({ flight, connectDropTarget, isOver, canDrop }) {
    const { name, from, to, progress, dateTakeOff, dateLanding, tail } = flight
    const [expanded, setExpanded] = useState(false)

    // TODO кастом хук
    const toggleExpanded = () => {
        setExpanded(!expanded)
    }

    // TODO - прогресс бар в отдельный компонент    
    return connectDropTarget(
        <div className={`flight__container 
            ${isOver && canDrop ? 'enableDrop' : ''}
            ${isOver && !canDrop ? 'disableDrop' : ''}
            ${progress > 100 ? 'ended' : ''}`
            }>
            <div className="flight__header">
                <div className="flight__header__row">
                    <div className="flight__name">{name}</div>
                    <div className="flight__expand-button" onClick={toggleExpanded}>{expanded ? '-' : '+'}</div>
                </div>
                <div className="flight__header__row left">
                    <div>{from.iata} - {to.iata}</div>
                    <div>{tail ? tail.name : null }</div>
                </div>
                <div className="small-font">
                   
                    <div>{dateTakeOff.format('DD.MM HH:mm')} - {dateLanding.format('DD.MM HH:mm')}</div>
                </div>
                
            </div>
            
            {getDetails(expanded, flight)}
        </div>
    )
}

function getDetails(expanded, flight) {
    if (expanded) {
        const {  status, progress } = flight
        return (
            <div>
                <div>{progress >= 0 ? Math.floor(progress) : null}</div>            
                <div className="progressbar__container">
                    <div style={{ left: -1 * (100 - progress) + '%', transition: 'left 1000ms ease-in'  }} className="progressbar__bar"></div>
                </div>
                <div>{status}</div>
            </div>
            )
    } else {
        return (<div></div>)
    }
}

// TODO debounce
const flightTarget = {
    
	canDrop(props, monitor) {
        const dragItem = monitor.getItem()
        if (dragItem.type === ItemTypes.TAIL) {
            return (props.flight.fromId === dragItem.airportId 
                && monitor.getItem().progress === -1
                && props.flight.progress === -1)
        } else if (dragItem.type === ItemTypes.ORDER) {
            return true
        }
        return false
	},

	drop(props) {
        return { id: props.flight.id };
    }
}

const collect = (
	connect,
	monitor,
) => {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: !!monitor.isOver(),
		canDrop: !!monitor.canDrop(),
	}
}

Flight.propTypes = {
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
        status: string
    })
}

export default 
    connect(
        (state, ownProps) => ({
            flight: flightByIdSelector(state, ownProps),
        })
)(
    DropTarget([ItemTypes.TAIL, ItemTypes.ORDER], flightTarget, collect)(Flight)
)
