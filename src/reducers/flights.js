import { pageActionTypes } from '../constants/action-types'
import { getEmptyFlight } from '../helpers/FlightHelper'
import { flightStatuses } from '../constants/flight-status'

const initialState = {}

export function flightsReducer(state = initialState, action) {
	const { type, payload = {} } = action
	const { flightId, tailId, orderId } = payload
	const flight = flightId ? state[flightId] : {};
	const newState = { ...state }
	let newFlight
	switch (type) {
		case pageActionTypes.ADD_TAIL_IN_FLIGHT:
			newFlight = { ...flight, tailId }
			return { ...state, [newFlight.id]: newFlight }
		case pageActionTypes.ADD_ORDER:
			if (flight) {
				newFlight = { ...flight, orderId }
				return { ...state, [newFlight.id]: newFlight }
			}
			return state
		case pageActionTypes.ADD_FLIGHT:
			newState[payload.flight.id] = payload.flight
			return newState
		case pageActionTypes.ADD_EMPTY_FLIGHT:
			newState[flightId] = getEmptyFlight(flightId)
			return newState
		case pageActionTypes.REMOVE_FLIGHT:
			delete newState[flightId]
			return newState
		case pageActionTypes.ADD_APPROACH_FLIGHT:
			if (payload.flight.fromId !== payload.flight.toId) {
				newState[payload.flight.id] = payload.flight
				return newState
			}
			return state
		case pageActionTypes.CREATE_FLIGHT_FROM_ORDER:
			const { newFlightId } = payload
			newState[newFlightId] = getEmptyFlight(newFlightId, tailId, orderId)
			return newState
		case pageActionTypes.CHECK_CANCELED:
			const { tails, maxTime, orders } = payload

			const canceledFlights =  Object.values(state).filter(flight => {
				const linkedOrder = orders.find(order => order.id === flight.orderId)
				const dateTakeOff = linkedOrder ? linkedOrder.dateTakeOff : flight.dateTakeOff
				if (dateTakeOff && dateTakeOff.isSame(maxTime)) {
					const linkedTail = tails.find(tail => tail.id === flight.tailId)
					
					const airportFrom = linkedOrder ? linkedOrder.fromId : flight.fromId

					return  (linkedTail && linkedTail.airportId !== airportFrom)
				}
				return false
			})

			if (canceledFlights.length === 0) {
				return state
			}

			return { ...state, ...canceledFlights.reduce((result, flight) => {
				result[flight.id] = { ...flight, status: flightStatuses.CANCELED}
				return result
			}, {}) }
		default: return state;
	}
}
