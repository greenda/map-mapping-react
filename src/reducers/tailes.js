import { pageActionTypes } from '../constants/action-types'

const initialState = [
    {
        id: 1,
        name: 'A-1',
        airportId: 11,
    },
    {
        id: 2,
        name: 'A-2',
        airportId: 8,
    },
    {
        id: 3,
        name: 'A-3',
        airportId: 2,
    },
]

export function tailsReducer(state = initialState, action) {
    const { type, payload = {} } = action
    const { airportId } = payload
    switch (type) {
        case pageActionTypes.ADD_TAIL: 
            const maxTailId = Math.max(...state.map(tail => tail.id))
            return [...state, {
                airportId,
                id: maxTailId + 1,
                name: `A-${maxTailId + 1}`,
            }]
        default: return state;
    }
}