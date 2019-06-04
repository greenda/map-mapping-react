import React, { useState }  from 'react'
import { connect } from 'react-redux'
import { currentTimeSelector } from '../../selectors/index'
import { incrementTime, decrementTime } from '../../actions/pageActions'
import './Timeline.scss'

// interface Props {
//     currentTime: Moment;
//     incrementTime: Function,
//     decrementTime: Function,
//  }

function Timeline({ currentTime, incrementTime, decrementTime }) {
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
        </div>        
    )
}

// TODO propTypes
// Timeline.propTypes = {
//     currentTime: PropTypes.Date
// }

export default connect(
    (state) => ({
        currentTime: currentTimeSelector(state)
    }),
    { incrementTime, decrementTime }
)(Timeline)