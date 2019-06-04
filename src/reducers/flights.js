import { pageActionTypes } from '../constants/action-types';
import { generateFlights } from '../common/flights-generator/flights-generator'
import moment from 'moment'

const initialState = {
    1: {
      id: 1,
      name: 'Flight 1',
      tail: null,
      tailId: 1,
      fromId: 1,
      toId: 2,
      dateTakeOff: moment(new Date(2000, 1, 1, 8)).utc(),
      dateLanding: moment(new Date(2000, 1, 1, 20)).utc(),
      status: 'progress',
      progress: 16,
    },
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

export function flightsReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {    
    case pageActionTypes.ADD_TAIL:
      const {tail, flightId} = action.payload;
      const flight = state[flightId];

      if (flight) {
        flight.tail = tail
        flight.tailId = tail.id
      }
      // TODO правильно оформить изменение массива
      return {...state}
    case pageActionTypes.GENERATE_FLIGHTS:
      const { maxTime, maxFlightId, airports } = payload
      const newFlight = generateFlights(maxTime, maxFlightId, airports)
      const result = {...state}      
      // TODO inmuttable
      newFlight.forEach((value) => {
        result[value.id] = value
      })
      
      return result
    default: return state;
  }
}