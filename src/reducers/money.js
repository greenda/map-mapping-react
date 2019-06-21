import moment from 'moment'
import { pageActionTypes } from '../constants/action-types';

const initialState = {
    currentBudget: 1000
}

export function moneyReducer(state = initialState, action) {
    const { type, payload = {} } = action
    const { flights, maxTime, currentTime } = payload

    switch (type) {  
        case pageActionTypes.CHECK_MONEY:
            if (maxTime.isSame(currentTime)) {
                let budget = state.currentBudget
                flights.forEach(flight => {
                    if (flight.dateLanding.isSame(currentTime)) {
                        console.log('pay')
                        budget = budget + flight.pay
                    }
                })
                return {...state, currentBudget: budget }
            }
            return state           
        default:
            return {...state}
    }
}