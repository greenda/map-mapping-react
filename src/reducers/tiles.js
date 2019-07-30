const initialState = [
    {
        id: 1,
        name: 'A-1',
        airportId: 11,
    },
    {
        id: 2,
        name: 'A-2',
        airportId: 11,
    },
    {
        id: 3,
        name: 'A-3',
        airportId: 2,
    }
]

export function tailsReducer(state = initialState) {
    return state;
}