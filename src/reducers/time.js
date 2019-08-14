import { pageActionTypes } from '../constants/action-types'
import moment from 'moment'

const startTime = moment.utc('2000-01-01T10:00:00+00:00')

const initialState = {
    currentTime: startTime.clone(),
    maxTime: startTime.clone(),
}

export function timeReducer(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case pageActionTypes.INC_TIME: 
            const newCurrentTime = state.currentTime.add(payload, 'hour').clone()
            state = {
                ...state,
                currentTime: newCurrentTime,
                maxTime: newCurrentTime.diff(state.maxTime) > 0 ? newCurrentTime.clone() : state.maxTime,
            }
            break;
        case pageActionTypes.DEC_TIME: 
            state = {
                ...state,
                currentTime: state.currentTime.add(-1 * payload, 'hour').clone()
            }
            break;
        case pageActionTypes.SET_START_TIME:
            state = {
                ...state,
                currentTime: startTime.clone()
            }
            break
        case pageActionTypes.SET_CURRENT_TIME:
            return {
                ...state,
                currentTime: state.maxTime.clone()
            }

        default: break;    
    }

    return state
}