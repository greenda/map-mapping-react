import { pageActionTypes } from '../constants/action-types';
// import { generateFlights } from '../common/flights-generator/flights-generator'
import moment from 'moment'

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
    // 2: {
    //   id: 2,
    //   name: 'Flight 2',
    //   tail: null,
    //   tailId: null,
    //   fromId: null,
    //   toId: null,
    //   status: 'planned',
    //   progress: -1,
    //   orderId: null,
    // },    
  }

export function flightsReducer(state = initialState, action) {
  const { type, payload = {} } = action
  const { flightId } = payload
  const flight = flightId ? state[flightId] : {};
  const newState =  {...state}
  switch (type) {    
    case pageActionTypes.ADD_TAIL:
      const {tail} = action.payload;      

      if (flight) {
        flight.tail = tail
        flight.tailId = tail.id
      }
      // TODO правильно оформить изменение массива
      return {...state}
    case pageActionTypes.ADD_ORDER:
      // TODO правильно оформить изменение массива
      // TODO Передавать только orderId
      const { order } = action.payload;

      if (flight) {
        flight.orderId = order.id
      }

      return {...state}
    case pageActionTypes.ADD_FLIGHT:
      newState[flightId] = payload.flight
      return newState     
    case pageActionTypes.ADD_EMPTY_FLIGHT:
      newState[flightId] = {
        id: flightId,
        name: 'Flight ' + flightId,
        tail: null,
        tailId: null,
        fromId: null,
        toId: null,
        dateTakeOff: null,
        dateLanding: null,
        status: 'planned',
        progress: -1,
        orderId: null,
      }
      return newState
    case pageActionTypes.REMOVE_FLIGHT:
      delete newState[flightId]
      return newState 
    default: return state;
  }
}