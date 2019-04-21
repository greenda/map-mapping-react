// TODO чисто названия полей, без pageActionTypes
import { pageActionTypes } from '../constants/action-types'
import moment from 'moment'

const initialState = {
    currentTime: moment(new Date(2000, 1, 1, 10, 0))
}

export function timeReducer(state = initialState, action) {
    const { type, payload } = action

    // TODO напрашивается inmuttable
    switch (type) {
        case pageActionTypes.INC_TIME: 
            state = {
                ...state,
                currentTime: state.currentTime.add(payload, 'hour').clone()
            }
        break;
        case pageActionTypes.DEC_TIME: break;
        default: break;
    }

    return state
}