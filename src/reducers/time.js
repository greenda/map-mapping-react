// TODO чисто названия полей, без pageActionTypes
import { pageActionTypes } from '../constants/action-types'
import moment from 'moment'

const initialState = {
    currentTime: moment(new Date(2000, 1, 1, 10, 0)).utc(),
    maxTime: moment(new Date(2000, 1, 1, 10, 0)).utc(),
}

export function timeReducer(state = initialState, action) {
    const { type, payload } = action

    // TODO напрашивается inmuttable
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
        default: break;
    }

    return state
}