import React, { useState, useEffect }  from 'react'
import { connect } from 'react-redux'
import { currentTimeSelector, currentBudgetSelector, maxTimeSelector } from '../../selectors/index'
import { incrementTime, decrementTime, checkMoney } from '../../actions/pageActions'
import './Timeline.scss'

// interface Props {
//     currentTime: Moment;
//     incrementTime: Function,
//     decrementTime: Function,
//  }

function Timeline({ flights, tails, maxTime, currentTime, incrementTime, decrementTime, currentBudget, checkMoney }) {
    useEffect(() => {   
        checkMoney(flights, tails, maxTime, currentTime)
    }, [maxTime])
    const [ interval, setIntervalConst ] = useState()

    const startInterval = () => {
        const i = setInterval(() => incrementTime(1), 1000)
        setIntervalConst(i)
    }
    const stopInterval = () => {
        clearInterval(interval)
        setIntervalConst(null)
    }

    return (
        <div className="timeline">
            <div className="timeline__current-time">{currentTime.format('DD.MM.YY HH:mm')}</div>
            <div className="timeline__button" onClick={() => incrementTime(1)}>+</div>
            <div className="timeline__button" onClick={() => decrementTime(1)}>-</div>
            <div className={`timeline__button ${interval ? 'disabled' : ''}`} onClick={startInterval}>></div>
            <div className={`timeline__button ${!interval ? 'disabled' : ''}`} onClick={stopInterval}>||</div>
            <div className="budget">{currentBudget}<span className="currency-sign">☼</span></div>
        </div>        
    )
}

// TODO propTypes
// Timeline.propTypes = {
//     currentTime: PropTypes.Date
// }

export default connect(
    (state) => ({
        // currentTime И maxTime вынести вверх
        currentTime: currentTimeSelector(state),
        currentBudget: currentBudgetSelector(state),
        maxTime: maxTimeSelector(state),
    }),
    { incrementTime, decrementTime, checkMoney }
)(Timeline)