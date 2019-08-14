import React, { useState, useEffect }  from 'react'
import PropTypes, { number, string } from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import { currentTimeSelector, currentBudgetSelector,
    maxTimeSelector, filteredFlightsSelector, tailCoordinates } from '../../selectors/index'
import { incrementTime, decrementTime, 
    setCurrentTime, setStartTime, checkMoney } from '../../actions/pageActions'
import TimelineView from './TimelineView'

export function TimelineContainer({  
    flights, tails, maxTime, currentTime, 
    incrementTime, decrementTime, currentBudget,
    setCurrentTime, setStartTime, checkMoney }) {
    const [didMount, setDidMount] = useState(false)

    useEffect(() => {   
        if (didMount) {
            checkMoney(flights, tails, maxTime, currentTime)
        } else {
            setDidMount(true)
        }        
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
        <TimelineView 
            currentTime={currentTime}
            currentBudget={currentBudget}
            incrementTime={incrementTime}
            decrementTime={decrementTime}
            setCurrentTime={setCurrentTime}
            setStartTime={setStartTime} 
            startInterval={startInterval}
            stopInterval={stopInterval}
            interval={interval}
        />
    )
}

TimelineContainer.propTypes = {
    currentTime: PropTypes.instanceOf(moment),
    maxTime: PropTypes.instanceOf(moment),
    flights:  PropTypes.arrayOf(PropTypes.shape({ 
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
    })),
    tails: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            airportId: PropTypes.number,
        })
    ),
    currentBudget: number,
    incrementTime: PropTypes.func,
    decrementTime: PropTypes.func,
    setCurrentTime: PropTypes.func,
    setStartTime: PropTypes.func,
    checkMoney: PropTypes.func,
}

export default connect(
    (state) => ({
        currentTime: currentTimeSelector(state),
        currentBudget: currentBudgetSelector(state),
        maxTime: maxTimeSelector(state),
        flights: filteredFlightsSelector(state),
        tails: tailCoordinates(state),
    }),
    { incrementTime, decrementTime, setCurrentTime, setStartTime, checkMoney }
)(TimelineContainer)