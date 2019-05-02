import { pageActionTypes } from '../constants/action-types';
import moment from 'moment'

const initialState = [
    {
      id: 1,
      name: 'Flight 1',
      tail: null,
      tailId: 1,
      fromId: 1,
      toId: 2,
      dateTakeOff: moment(new Date(2000, 1, 1, 8)),
      dateLanding: moment(new Date(2000, 1, 1, 20)),
      status: 'progress'
    },
    {
      id: 2,
      name: 'Flight 2',
      tail: { id: 10, name: 'name10'},
      fromId: 1,
      toId: 3,
      dateTakeOff: moment(new Date(2000, 1, 1, 11)),
      dateLanding: moment(new Date(2000, 1, 1, 16)),
      status: 'planed'
    }
  ]

export function flightsReducer(state = initialState, action) {

  switch (action.type) {    
    case pageActionTypes.ADD_TAIL:
      const {tail, flightId} = action.payload;
      const flight = state.find(value => value.id === flightId);

      if (flight) {
        flight.tail = tail;
      }
      // TODO правильно оформить изменение массива
      return [...state]
    default: return state;
  }
}