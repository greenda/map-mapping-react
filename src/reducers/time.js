// TODO чисто названия полей, без pageActionTypes
import { pageActionTypes } from '../constants/action-types'
import moment from 'moment'

const initialState = {
    currentTime: moment.utc('2000-01-01T10:00:00+00:00'),
    maxTime: moment.utc('2000-01-01T10:00:00+00:00'),
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