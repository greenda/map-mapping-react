import { pageActionTypes } from '../constants/action-types'
import moment from 'moment'
import { getApproachFlight, getEmptyFlight } from '../helpers/FlightHelper'
// import { generateFlights } from '../common/flights-generator/flights-generator'

const initialState = {
    1: {
      id: 1,
      name: 'Flight 1',
      tail: null,
      tailId: 1,
      status: 'progress',
      progress: 16,
      orderId: 1,
    },    
    2: {
      id: 2,
      name: 'Flight 2',
      tail: null,
      tailId: 2,
      fromId: 4,
      toId: 5,
      status: 'planned',
      progress: -1,
      orderId: null,
      dateTakeOff: moment.utc('2000-01-01T18:00:00+00:00'),
      dateLanding: moment.utc('2000-01-01T24:00:00+00:00'),
    },    
  }

export function flightsReducer(state = initialState, action) {
  const { type, payload = {} } = action
  const { flightId } = payload
  const flight = flightId ? state[flightId] : {};
  const newState =  {...state}
  switch (type) {    
    case pageActionTypes.ADD_TAIL:
      const { tail } = payload
      if (flight) {
        flight.tail = tail
        flight.tailId = tail.id
      }
      // TODO правильно оформить изменение массива
      return {...state}
    case pageActionTypes.ADD_ORDER:
      // TODO правильно оформить изменение массива
      // TODO Передавать только orderId
      const { orderId } = action.payload;
      
      if (flight) {
        flight.orderId = orderId
      }

      return {...state}
    case pageActionTypes.ADD_FLIGHT:
      newState[payload.flight.id] = payload.flight
      return newState     
    case pageActionTypes.ADD_EMPTY_FLIGHT:
      // TODO вынести создание пустого в хелпер
      newState[flightId] = getEmptyFlight(flightId)
      return newState
    case pageActionTypes.REMOVE_FLIGHT:
      delete newState[flightId]
      return newState 
    case pageActionTypes.ADD_APPROACH_FLIGHT:
      newState[payload.flight.id] = payload.flight
      return newState
    default: return state;
  }
}