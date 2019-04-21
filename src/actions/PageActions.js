
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

export function decrementTime(value) {
  return {
    type: pageActionTypes.DEC_TIME,
    payload: value,
  }
}

