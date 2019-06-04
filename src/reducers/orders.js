import moment from 'moment'

const initialState = {
    items: {
        2: {
            id: 2,
            name: 'Flight 2',
            tail: null,
            tailId: null,
            fromId: 1,
            toId: 3,
            dateTakeOff: moment(new Date(2000, 1, 1, 11)).utc(),
            dateLanding: moment(new Date(2000, 1, 1, 16)).utc(),
            status: 'planed',
            progress: -1,
          },
          3: {
            id: 3,
            name: 'Flight 3',
            tail: null,
            fromId: 3,
            toId: 2,
            dateTakeOff: moment(new Date(2000, 1, 1, 18)).utc(),
            dateLanding: moment(new Date(2000, 1, 1, 24)).utc(),
            status: 'planed',
            progress: -1,
          }
    }
}

export function ordersReducer(state = initialState) {
    return state;
}
