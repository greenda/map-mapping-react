import React  from 'react'
import { connect } from 'react-redux'
import moment, { Moment } from 'moment'
import { currentTimeSelector } from '../../../src/selectors/index'
import { incrementTime, decrementTime } from '../../actions/pageActions'

interface Props {
    currentTime: Moment;
    incrementTime: Function,
    decrementTime: Function,
 }

function Timeline({ currentTime, incrementTime, decrementTime }: Props) {
    let interval: number = 0
    const startInterval = () => {
        incrementTime(1)
    }
    const stopInterval = () => {
        clearInterval(interval)
    }

    return (
        <div>
            <div>{currentTime.format('YYYY-MM-DD HH:mm')}</div>
            <button onClick={startInterval}>+</button>
            <button onClick={stopInterval}>||</button>
        </div>
        
    )
}

// Timeline.propTypes = {
//     currentTime: PropTypes.Date
// }

export default connect(
    (state) => ({
        currentTime: currentTimeSelector(state)
    }),
    { incrementTime, decrementTime }
)(Timeline)