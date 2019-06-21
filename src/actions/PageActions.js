
import { pageActionTypes } from '../constants/action-types'

export function addTail(tail, flightId) {
  return {
    type: pageActionTypes.ADD_TAIL,
    payload: { tail, flightId },
  }
}

export function addFlight(flight, flightId) {
  return {
    type: pageActionTypes.ADD_FLIGHT,
    payload: { flight, flightId },
  }
}

export function addEmptyFlight(flightId) {
  return {
    type: pageActionTypes.ADD_EMPTY_FLIGHT,
    payload: { flightId },
  }
}

export function removeFlight(flightId) {
  return {
    type: pageActionTypes.REMOVE_FLIGHT,
    payload: { flightId }
  }
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

export function generateOrders(maxTime, maxFlightId, airports) {
  return {
    type: pageActionTypes.GENERATE_ORDERS,
    payload: { maxTime, maxFlightId, airports }
  }
}

export function addOrder(order, flightId) {
  return {
    type: pageActionTypes.ADD_ORDER,
    payload: { order, flightId }
  }
}

export function checkMoney(flights, maxTime, currentTime) {
  return {
    type: pageActionTypes.CHECK_MONEY,
    payload: { flights, maxTime, currentTime }
  }
}

