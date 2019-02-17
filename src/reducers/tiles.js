const initialState = {
    tails: [
        {
            id: 1,
            name: 'A-1',
        },
        {
            id: 2,
            name: 'A-2',
        },
        {
            id: 3,
            name: 'A-3',
        }
    ]
}

export function tailsReducer(state = initialState) {
    return state;
}