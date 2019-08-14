import React  from 'react'
import PropTypes, { number, func } from 'prop-types'
import moment from 'moment'
import './TimelineView.scss'

export function TimelineView({ 
    currentTime, currentBudget,
    incrementTime, decrementTime, 
    setCurrentTime, setStartTime, 
    startInterval, stopInterval, interval }) {

    return (
        <div className="timeline">
            <div className="timeline__current-time">{currentTime.format('DD.MM.YY HH:mm')}</div>            
            <div className="timeline__button" onClick={() => incrementTime(1)}>+</div>
            <div className="timeline__button hidden" onClick={() => decrementTime(1)}>-</div>            
            <div className="timeline__button" onClick={() => setStartTime()}>|&lt;</div>
            <div className={`timeline__button ${interval ? 'disabled' : ''}`} onClick={startInterval}>></div>
            <div className={`timeline__button ${!interval ? 'disabled' : ''}`} onClick={stopInterval}>||</div>
            <div className="timeline__button" onClick={() => setCurrentTime()}>>|</div>
            <div className="budget">{currentBudget}<span className="currency-sign">☼</span></div>
        </div>        
    )
}

TimelineView.propTypes = {
    currentTime: PropTypes.instanceOf(moment),
    currentBudget: number,    
    incrementTime: func,
    decrementTime: func,
    setCurrentTime: func,
    setStartTime: func,
    startInterval: func,
    stopInterval: func,
    interval: number,
}

export default TimelineView