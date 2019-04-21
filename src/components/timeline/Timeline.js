import React, { useState }  from 'react'
import { connect } from 'react-redux'
import { currentTimeSelector } from '../../selectors/index'
import { incrementTime, decrementTime } from '../../actions/pageActions'

// interface Props {
//     currentTime: Moment;
//     incrementTime: Function,
//     decrementTime: Function,
//  }

function Timeline({ currentTime, incrementTime, decrementTime }) {
    const [ interval, setIntervalConst ] = useState()
    
    const startInterval = () => {
        console.log('startInterval')
        const i = setInterval(() => incrementTime(1), 1000)
        setIntervalConst(i)
    }
    const stopInterval = () => {
        clearInterval(interval)
        setIntervalConst(null)
    }

    return (
        <div>
            <div>{currentTime.format('YYYY-MM-DD HH:mm')}</div>
            <button onClick={() => incrementTime(1)}>+</button>
            <button onClick={() => decrementTime(1)}>-</button>
            <button disabled={interval} onClick={startInterval}>></button>
            <button disabled={!interval} onClick={stopInterval}>||</button>
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