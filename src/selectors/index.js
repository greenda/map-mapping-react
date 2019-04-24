import { createSelector } from 'reselect'
import { getFlightInTime } from '../helpers/FlightHelper'

export const currentTimeSelector = (state) => state.time.currentTime
export const airportsSelector = (state) => state.airports
export const airportIdsSelector = (state) => Object.keys(state.airports).map(value => +value)
export const flightsSelector = (state) => state.flights
export const flightIdsSelector = (state) => Object.keys(state.flights).map(value => +value)

export const airportByIdSelector = createSelector(
    airportsSelector,
    (airports, id) => airports[id]
)

export const flightByIdSelector = createSelector(
    currentTimeSelector,
    airportsSelector,
    flightsSelector,
    (_, { id }) => id,
    () => getFlightInTime,
    (currentTime, airports, flights, id, getFlightInTime) => 
        getFlightInTime({...flights[id]}, airports, currentTime)
)

export const flightsOnTime = createSelector(
    currentTimeSelector,
    airportsSelector,
    flightsSelector,
    () => getFlightInTime,
    // TODO - присоединять аэропорты в другом селекторе
    (currentTime, airports, flights, getFlightInTime) => 
        flights.map(flight => getFlightInTime(flight, airports, currentTime))
)
