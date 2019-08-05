import { pageActionTypes } from '../constants/action-types'
import { getEmptyFlight } from '../helpers/FlightHelper'

const initialState = {
    // 1: {
    //   id: 1,
    //   name: 'Flight 1',
    //   tail: null,
    //   tailId: 1,
    //   status: 'progress',
    //   progress: 16,
    //   orderId: 1,
    // },    
    // 2: {
    //   id: 2,
    //   name: 'Flight 2',
    //   tail: null,
    //   tailId: 2,
    //   fromId: 4,
    //   toId: 5,
    //   status: 'planned',
    //   progress: -1,
    //   orderId: null,
    //   dateTakeOff: moment.utc('2000-01-01T18:00:00+00:00'),
    //   dateLanding: moment.utc('2000-01-01T24:00:00+00:00'),
    //   pay: 1100,
    //   cost: 100,
    // },    
    // 3: {
    //   dateTakeOff: moment.utc('2000-01-01T14:00+00:00'),
    //   dateLanding: moment.utc('2000-01-01T17:00:00+00:00'),
    //   fromId: 1,
    //   toId: 4,
    //   cost: 600,
    //   id: 3,
    //   name: 'Подлет 3',
    //   tail: {
    //     id: 2,
    //     name: 'A-2',
    //     airportId: 1
    //   },
    //   progress: -1,
    //   orderId: null,
    //   tailId: 2,
    //   pay: 0,
    //   lindedFlightId: 2,
    // }, 
  }

export function flightsReducer(state = initialState, action) {
  const { type, payload = {} } = action
  const { flightId, orderId } = payload
  const flight = flightId ? state[flightId] : {};
  const newState =  {...state}
  switch (type) {    
    case pageActionTypes.ADD_TAIL_IN_FLIGHT:       
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
    case pageActionTypes.CREATE_FLIGHT_FROM_ORDER:
        const { newFlightId, tailId } = payload
        let newFlight = getEmptyFlight(newFlightId)
        newFlight = {...newFlight, tailId, orderId }
        newState[newFlightId] = newFlight
        return newState
    default: return state;
  }
}
