import { createSelector } from 'reselect'
import { getFlightInTime, getOrdersInTime, getApproachFlight } from '../helpers/FlightHelper'
import { getChainElement } from '../helpers/BudgetHelper'
import { getOrderSchaduleRows } from '../helpers/ScheduleHelper'
import { flightStatuses } from '../constants/flight-status'
import * as d3 from 'd3'

export const currentTimeSelector = (state) => state.time.currentTime
export const airportObjectsSelector = (state) => state.geography.airports
export const airportsSelector = (state) => Object.values(state.geography.airports)
export const airportIdsSelector = (state) => Object.keys(state.geography.airports).map(value => +value)
export const flightsSelector = (state) => Object.values(state.flights)
export const flightsObjectSelector = (state) => state.flights
export const flightIdsSelector = (state) => Object.keys(state.flights).map(value => +value).reverse()
export const tailsSelector = (state) => state.tails
export const maxTimeSelector = (state) => state.time.maxTime
export const ordersObjectSelector = (state) => state.orders.items
export const ordersSelector = (state) => Object.values(state.orders.items)
export const orderIdsSelector = (state) => Object.keys(state.orders.items).map(value => +value).reverse()
export const currentBudgetSelector = (state) => state.money.currentBudget
export const fuelCostSelector = (_) => 100
export const budgetChainsSelector = (state) => state.money.budgetChains
export const licencesObjectSelector = (state) => state.geography.licences
export const licenceIdsSelector = (state) => Object.keys(state.geography.licences).map(value => +value)
export const currentLicenceIdsSelector = (state) => state.geography.currentLicenceIds
export const achievementsSelector = (state) => state.achievements.all
export const currentAchievementIdsSelector = (state) => state.achievements.currentAchievemntIds

export const flightsDetailSelector = createSelector(
    flightsSelector,
    tailsSelector,
    ordersObjectSelector,
    (flights, tails, orders) => flights.map((flight) => {
            const newFlight = { ...flight }
            if (flight.tailId) {
                newFlight.tail = tails.find(tail => tail.id === flight.tailId)
            }
            if (flight.orderId) {
                const order = Object.values(orders).find(order => order.id === flight.orderId)
                newFlight.fromId = order.fromId
                newFlight.toId = order.toId
                newFlight.dateTakeOff = order.dateTakeOff
                newFlight.dateLanding = order.dateLanding
                newFlight.pay = order.pay
                newFlight.cost = order.cost
                newFlight.name = `${order.name}`
                newFlight.description = order.description
            }

            return newFlight
    })
)

export const flightsOnTime = createSelector(
    currentTimeSelector,
    airportsSelector,
    flightsDetailSelector,
    ordersObjectSelector,
    () => getFlightInTime,
    (currentTime, airports, flights, orders, getFlightInTime) => 
        flights.map(flight => getFlightInTime(flight, airports, orders, currentTime))            
)

export const tailCoordinates = createSelector(
    tailsSelector,
    airportsSelector,    
    flightsOnTime,
    currentTimeSelector,
    (tails, airports, flights, currentTime) => {
        return tails.map((tail) => {
            const filteredFlight = 
                flights.filter(flight => flight.status !== flightStatuses.CANCELED && flight.tailId === tail.id &&
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
    (_, { id }) => id,
    () => getFlightInTime,
    (currentTime, airports, flights, orders, id, getFlightInTime) => {
        return getFlightInTime({...flights[id]}, airports, orders, currentTime)
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

export const ordersOnTime = createSelector(
    currentTimeSelector,
    airportsSelector,
    ordersObjectSelector,
    () => getOrdersInTime,
    (currentTime, airports, orders, getOrdersInTime) => {
        return Object.values(orders).map(order => getOrdersInTime(order, airports, orders, currentTime)) 
    }
)

export const maxFlightIdSelector = createSelector(
    flightIdsSelector,
    (ids) => ids.length > 0 ? Math.max(...ids) : 0
)

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

export const budgetChainsElementsSelector = createSelector(
    filteredFlightsSelector,
    budgetChainsSelector,
    (flights, budgetChains) => {
        return budgetChains.map((chain, index) => getChainElement(chain, flights, index)).filter(chain => chain)
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
    flightsOnTime,
    (flights) => {
        return flights.filter(flight => flight.progress >= 100 
            && flight.description 
            && flight.description.includes('чулок')).length
    }
)

export const approachFlightBlancSelector = createSelector(
    filteredFlightsSelector,
    tailCoordinates,
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