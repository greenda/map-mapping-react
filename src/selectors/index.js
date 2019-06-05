import { createSelector } from 'reselect'
import { getFlightInTime } from '../helpers/FlightHelper'

export const currentTimeSelector = (state) => state.time.currentTime
export const airportsSelector = (state) => state.airports.items
export const airportIdsSelector = (state) => Object.keys(state.airports.items).map(value => +value)
export const flightsSelector = (state) => Object.values(state.flights)
export const flightsObjectSelector = (state) => state.flights
export const flightIdsSelector = (state) => Object.keys(state.flights).map(value => +value).reverse()
export const tailsSelector = (state) => state.tails
export const maxTimeSelector = (state) => state.time.maxTime
export const ordersObjectSelector = (state) => state.orders.items
export const ordersSelector = (state) => Object.values(state.orders.items)
export const orderIdsSelector = (state) => Object.keys(state.orders.items).map(value => +value).reverse()

export const flightsDetailSelector = createSelector(
    flightsSelector,
    tailsSelector,
    (flights, tails) => flights.map((value) => {
            if (value.tailId) {
                value.tail = tails.find(tail => tail.id === value.tailId)
            }
            return value
        })
)

export const tailsDetalsSelector = createSelector(
    airportsSelector,
    tailsSelector,
    (airports, tails) => tails.map(tail => ({ ...tail, airport: tail.airportId ? airports[tail.airportId] : null }))
)

export const airportByIdSelector = createSelector(
    airportsSelector,
    (airports, id) => airports[id]
)

export const flightByIdSelector = createSelector(
    currentTimeSelector,
    airportsSelector,
    flightsObjectSelector,
    ordersObjectSelector,
    (_, { id }) => id,
    () => getFlightInTime,
    (currentTime, airports, flights, orders, id, getFlightInTime) => 
        getFlightInTime({...flights[id]}, airports, orders, currentTime)
)

export const flightsOnTime = createSelector(
    currentTimeSelector,
    airportsSelector,
    flightsDetailSelector,
    ordersObjectSelector,
    () => getFlightInTime,
    // TODO - присоединять аэропорты в другом селекторе
    (currentTime, airports, flights, orders, getFlightInTime) => 
        flights.map(flight => getFlightInTime(flight, airports, orders, currentTime))            
)

export const tailCoordinates = createSelector(
    tailsSelector,
    airportsSelector,    
    flightsSelector,
    currentTimeSelector,
    (tails, airports, flights, _) => {
        return tails.map((tail) => {
            const filteredFlight = flights.filter(flight => flight.tailId === tail.id)
            let tailAirport = tail.airportId ? airports[tail.airportId] : null
            let flightProgress = -1;
            if (filteredFlight.length > 0) {
                const sortedFlights = filteredFlight.sort((a, b) => a.dateLanding.diff(b.dateLanding))
                const endFlight = sortedFlights[sortedFlights.length - 1]
                flightProgress = endFlight.progress 
                switch (true) {
                    case flightProgress <= 0: tailAirport = airports[endFlight.fromId]; break;
                    case flightProgress >= 100: tailAirport = airports[endFlight.toId]; break;
                    default: tailAirport = null;
                }
            }
            flightProgress = flightProgress < 100 ? flightProgress : -1
            
            return tailAirport ? 
                { ...tail, airport: tailAirport, airportId: tailAirport.id, 
                    coordinates: [tailAirport.longt, tailAirport.latt],
                    progress: flightProgress
                } 
                : { ...tail, progress: flightProgress }
        })
    }
)

export const orderByIdSelector = createSelector(
    currentTimeSelector,
    airportsSelector,
    ordersObjectSelector,
    (_, { id }) => id,
    (currentTime, airports, orders, id) => {
        return getFlightInTime({...orders[id]}, airports, orders, currentTime) 
    }
)