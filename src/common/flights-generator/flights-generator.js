
import { getOrderDescription, getRandomFromToAirportIds, getCostAndPay } from '../../helpers/FlightHelper'

const maxHourOffset = 48
const minHourOffset = 2
const randomCoeff = 0.8
const maxFlightOnHour = 3

export function generateFlights(maxTime, maxFlightId, 
    airports, airportDistances, fuelCost, isRequired) {
    if (isRequired || Math.random() > randomCoeff) {
        const flighOnHour = isRequired ? maxFlightOnHour : 
            Math.round(Math.random() * maxFlightOnHour + 1)
        const flights = Array(flighOnHour).fill('')
            
        return flights.map((_, index) => 
            generateFlight(maxTime, maxFlightId + index, 
                airports, airportDistances, fuelCost)
        )
    }

    return []    
}

function generateFlight(maxTime, maxFlightId, airports, airportDistances, fuelCost) {
    const timeOffset = 
        Math.round((Math.random() * (maxHourOffset - minHourOffset)  + minHourOffset))  
    const { fromId, toId } = getRandomFromToAirportIds(airports.map(value => value.id))
    
    const flightLength = airportDistances(fromId, toId)
    const dateTakeOff = maxTime.clone().add(timeOffset, 'hours')    
    const dateLanding = dateTakeOff.clone().add(flightLength, 'hours')

    const { cost, pay } = getCostAndPay(fromId, toId, airportDistances, airports, fuelCost)    
    const { title, description } = getOrderDescription()
    const id = maxFlightId + 1

    return {
        id,
        fromId,
        toId,
        dateTakeOff,
        dateLanding,
        pay,
        cost,
        description,
        name: `${title} ${id}`,
        tail: null,
        tailId: null,
        status: 'planned',
        progress: -1,
    }
}
