// TODO разбросать по нескольким селекторам

import { createSelector } from 'reselect'
import { getFlightInTime, getOrdersInTime, getApproachFlight } from '../helpers/FlightHelper'
import { getChainElement } from '../helpers/BudgetHelper'
import { getOrderSchaduleRows } from '../helpers/ScheduleHelper'
import * as d3 from 'd3'

export const currentTimeSelector = (state) => state.time.currentTime
export const airportObjectsSelector = (state) => state.airports.items
export const airportsSelector = (state) => Object.values(state.airports.items)
export const airportIdsSelector = (state) => Object.keys(state.airports.items).map(value => +value)
export const flightsSelector = (state) => Object.values(state.flights)
export const flightsObjectSelector = (state) => state.flights
export const flightIdsSelector = (state) => Object.keys(state.flights).map(value => +value).reverse()
export const tailsSelector = (state) => state.tails
export const maxTimeSelector = (state) => state.time.maxTime
export const ordersObjectSelector = (state) => state.orders.items
export const ordersSelector = (state) => Object.values(state.orders.items)
export const orderIdsSelector = (state) => Object.keys(state.orders.items).map(value => +value).reverse()
export const currentBudgetSelector = (state) => state.money.currentBudget
export const airportDistancesSelector = (state) => state.airports.distance
export const fuelCostSelector = (_) => 100
export const budgetChainsSelector = (state) => state.money.budgetChains
export const licencesObjectSelector = (state) => state.airports.licences
export const licenceIdsSelector = (state) => Object.keys(state.airports.licences).map(value => +value)
export const currentLicenceIdsSelector = (state) => state.airports.currentLicenceIds
export const achievementsSelector = (state) => state.achievements.all
export const currentAchievementIdsSelector = (state) => state.achievements.currentAchievemntIds


export const tailCoordinates = createSelector(
    tailsSelector,
    airportsSelector,    
    flightsSelector,
    currentTimeSelector,
    (tails, airports, flights, currentTime) => {
        return tails.map((tail) => {
            const filteredFlight = 
                flights.filter(flight => flight.status !== 'canceled' && flight.tailId === tail.id &&
                    flight.dateTakeOff &&
                    flight.dateTakeOff.isBefore(currentTime))
            let tailAirport = tail.airportId ? airports.find(value => value.id === tail.airportId) : null
            let flightProgress = -1;
            if (filteredFlight.length > 0) {
                const sortedFlights = 
                    filteredFlight.sort((a, b) => a.dateLanding.diff(b.dateLanding))
                const endFlight = sortedFlights[sortedFlights.length - 1]
                flightProgress = endFlight.progress 
                switch (true) {
                    case flightProgress <= 0: tailAirport = airports.find(value => value.id === endFlight.fromId); break;
                    case flightProgress >= 100: tailAirport = airports.find(value => value.id === endFlight.toId); break;
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
    (airports, tails) => tails.map(tail => 
        ({ ...tail, airport: tail.airportId ? 
            airports.find(value => value.id === tail.airportId) : null }))
)

export const airportByIdSelector = createSelector(
    airportsSelector,
    (airports, id) => airports.find(value => value.id === id)
)

export const flightByIdSelector = createSelector(
    currentTimeSelector,
    airportsSelector,
    flightsObjectSelector,
    ordersObjectSelector,
    tailCoordinates,
    (_, { id }) => id,
    () => getFlightInTime,
    (currentTime, airports, flights, orders, tails, id, getFlightInTime) => {
        return getFlightInTime({...flights[id]}, airports, orders, tails, currentTime)
    }
)

export const flightsOnTime = createSelector(
    currentTimeSelector,
    airportsSelector,
    flightsDetailSelector,
    ordersObjectSelector,
    tailCoordinates,
    () => getFlightInTime,
    // TODO - присоединять аэропорты в другом селекторе
    (currentTime, airports, flights, orders, tails, getFlightInTime) => 
        flights.map(flight => getFlightInTime(flight, airports, orders, tails, currentTime))            
)

export const orderByIdSelector = createSelector(
    currentTimeSelector,
    airportsSelector,
    ordersObjectSelector,
    tailCoordinates,
    (_, { id }) => id,
    (currentTime, airports, orders, tails, id) => {
        return getFlightInTime({...orders[id]}, airports, orders, tails, currentTime) 
    }
)

export const ordersOnTime = createSelector(
    currentTimeSelector,
    airportsSelector,
    ordersObjectSelector,
    () => getOrdersInTime,
    // TODO - присоединять аэропорты в другом селекторе
    (currentTime, airports, orders, getOrdersInTime) => {
        return Object.values(orders).map(order => getOrdersInTime(order, airports, orders, currentTime)) 
    }
)

export const maxFlightIdSelector = createSelector(
    flightIdsSelector,
    (ids) => ids.length > 0 ? Math.max(...ids) : 0
)

// TODO в часах
export const distanceBetweenAirportsSelector = createSelector(
    airportObjectsSelector,
    (airports) => {
        return (airport1Id, airport2Id) => {
            const airport1 = airports[airport1Id]
            const airport2 = airports[airport2Id]

            return Math.round(
                d3.geoDistance(
                    [airport1.longt, airport1.latt],
                    [airport2.longt, airport2.latt]) * 6371 / 760)
        }
    }
)

export const approachFlightBlancSelector = createSelector(
    flightsSelector,
    tailsSelector,
    distanceBetweenAirportsSelector,
    fuelCostSelector,
    maxFlightIdSelector,
    currentTimeSelector,
    (flights, tails, airportDistances, fuelCost, maxFlightId, currentTime) => {
        return (flightId) => {
            return getApproachFlight(flightId, tails, flights, fuelCost, airportDistances, maxFlightId, currentTime)
        }
    }
)

export const budgetChainsElementsSelector = createSelector(
    flightsSelector,
    budgetChainsSelector,
    (flights, budgetChains) => {
        return budgetChains.map((chain, index) => getChainElement(chain, flights, index))
    }    
)

export const licencedRegionsIdsSelector = createSelector(
    licencesObjectSelector,
    currentLicenceIdsSelector,
    (licences, currentLicenceIds) => {
        return currentLicenceIds
            .map(licenceId => licences[licenceId].regionIds)
            .reduce((result, regionIds) => result = [...result, ...regionIds], [])
    }
)

export const licencedAirportsSelector = createSelector(
    licencedRegionsIdsSelector,
    airportsSelector,
    (regionsId, airports) => {
        return airports.filter(airport => regionsId.includes(airport.regionId))
    }
)

export const filteredFlightsSelector = createSelector(
    flightsOnTime,
    currentTimeSelector,
    (flights, currentTime) => {
        const MAX_HOUR_DIFF = 2
        const filteredFlights = 
            flights.filter(flight =>  !flight.dateLanding || 
                currentTime.diff(flight.dateLanding, 'hours') <= MAX_HOUR_DIFF)
        
        return filteredFlights
    }
)

export const filteredFlightIdsSelector = createSelector(
    filteredFlightsSelector,
    (filteredFlights) => {
        return filteredFlights.length > 0 ? filteredFlights.map(flight => flight.id).reverse() : []
    }
)

export const licencedOrderSelector = createSelector(
    ordersOnTime,
    airportObjectsSelector,
    licencedRegionsIdsSelector,
    filteredFlightsSelector,
    currentTimeSelector,
    (orders, airports, regionIds, flights, currentTime) => {
        const orderInWorkIds = flights.map(flight => flight.orderId)
        return orders && orders.length > 0 ? 
            orders.filter(order =>
                    order.dateTakeOff.diff(currentTime, 'hours') > 0 &&
                    !orderInWorkIds.includes(order.id))
                .map(order => ({...order, regionIds: [airports[order.fromId].regionId, airports[order.toId].regionId]}))
                .filter(order => order.regionIds.every(region => regionIds.includes(region)))
                .reverse() : []
    }
)

export const licencedOrderIdsSelector = createSelector(
    licencedOrderSelector,
    (filteredOrders) => filteredOrders.length > 0 ? filteredOrders.map(order => order.id) : []
)

export const maxOrderIdSelector = createSelector(
    orderIdsSelector,
    (orderIds) => {
        return orderIds.length === 0 ? 0 : Math.max(...orderIds)
    }
)

export const ordersToScheduleSelector = createSelector(
    ordersOnTime,
    airportObjectsSelector,
    licencedRegionsIdsSelector,
    filteredFlightsSelector,
    currentTimeSelector,
    (orders, airports, regionIds, flights, currentTime) => {
        const orderInWorkIds = flights.map(flight => flight.orderId)
        const filteredOrders = orders && orders.length > 0 ? 
            orders.filter(order =>
                    order.dateLanding.diff(currentTime, 'hours') > -4 &&
                    !orderInWorkIds.includes(order.id))
                .map(order => ({...order, regionIds: [airports[order.fromId].regionId, airports[order.toId].regionId]}))
                .filter(order => order.regionIds.every(region => regionIds.includes(region)))
                .reverse() : []

        const sorterArray = [...filteredOrders].sort((a, b) => a.dateTakeOff.isAfter(b.dateTakeOff) ? 1 : -1)
        const rows = getOrderSchaduleRows(sorterArray)
                
        return rows.reduce((result, orders, index) => 
            [...result, ...orders.map(order => { order.rowIndex = index; return order })], [])
    }
)

export const licencesSelector = createSelector(
    licencesObjectSelector,
    currentLicenceIdsSelector,
    (licencesObject, currentLicenceIds) => {
        return Object.values(licencesObject).map(licence => 
            ({...licence, isActive: (currentLicenceIds.includes(licence.id)) })
        )
    }
)

export const stockingFlightCountsSelector = createSelector(
    flightsSelector,
    (flights) => {
        return flights.filter(flight => flight.progress >= 100 
            && flight.description 
            && flight.description.includes('чулок')).length
    }
)
