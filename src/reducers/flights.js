import { pageActionTypes } from '../actions/PageActions';

const initialState = {
  flights: [
    {
      id: 1,
      name: 'Flight 1',
      tail: null,
    },
    {
      id: 2,
      name: 'Flight 2',
      tail: { id: 10, name: 'name10'},
    }
  ]
}

export function flightsReducer(state = initialState, action) {

  switch (action.type) {    
    case pageActionTypes.ADD_TAIL:
      const {tail, flightId} = action.payload;
      const flight = state.flights.find(value => value.id === flightId);

      if (flight) {
        flight.tail = tail;
      }
      // TODO правильно оформить изменение массива
      return {
        ...state,
      }
    default: return state;
  }
}