
import { pageActionTypes } from '../constants/action-types'

export function addTail(tail, flightId) {
  return {
    type: pageActionTypes.ADD_TAIL,
    payload: { tail, flightId },
  };
}

export function incrementTime(value) {
  return {
    type: pageActionTypes.INC_TIME,
    payload: value,
  }
}

// TODO нужна ли, если можно использовать increment(-1)
export function decrementTime(value) {
  return {
    type: pageActionTypes.DEC_TIME,
    payload: value,
  }
}

export function generateFlights(maxTime, maxFlightId, airports) {
  return {
    type: pageActionTypes.GENERATE_FLIGHTS,
    payload: { maxTime, maxFlightId, airports }
  }
}

export function addOrder(order, flightId) {
  return {
    type: pageActionTypes.ADD_ORDER,
    payload: { order, flightId }
  }
}

