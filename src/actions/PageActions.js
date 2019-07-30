
import { pageActionTypes } from '../constants/action-types'

export function addTail(tail, flightId) {
  return {
    type: pageActionTypes.ADD_TAIL,
    payload: { tail, flightId },
  }
}

export function addFlight(flight) {
  return {
    type: pageActionTypes.ADD_FLIGHT,
    payload: { flight },
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

export function addApproachFlight(flight) {
  return {
    type: pageActionTypes.ADD_APPROACH_FLIGHT,
    payload: { flight }
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

export function generateOrders(maxTime, maxFlightId, 
  airports, airportDistances, isRequired) {
  return {
    type: pageActionTypes.GENERATE_ORDERS,
    payload: { maxTime, maxFlightId, airports, airportDistances, isRequired }
  }
}

export function addOrder(orderId, flightId) {
  return {
    type: pageActionTypes.ADD_ORDER,
    payload: { orderId, flightId }
  }
}

export function checkMoney(flights, tails, maxTime, currentTime) {
  return {
    type: pageActionTypes.CHECK_MONEY,
    payload: { flights, tails, maxTime, currentTime }
  }
}

