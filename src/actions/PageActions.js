
import { pageActionTypes } from '../constants/action-types'

export function addTailInFlight(tail, flightId) {  
  return {
    type: pageActionTypes.ADD_TAIL_IN_FLIGHT,
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

export function createFlightFromOrder(orderId, newFlightId, tailId) {
  return {
    type: pageActionTypes.CREATE_FLIGHT_FROM_ORDER,
    payload: { orderId, newFlightId, tailId }
  }
}

export function checkMoney(flights, tails, maxTime, currentTime) {
  return {
    type: pageActionTypes.CHECK_MONEY,
    payload: { flights, tails, maxTime, currentTime }
  }
}

export function addLicence(licence) {
  return {
    type: pageActionTypes.ADD_LICENCE,
    payload: { licence }
  }
}

export function addTail(airportId, cost) {
  return {
    type: pageActionTypes.ADD_TAIL,
    payload: { airportId, cost }
  }
}

