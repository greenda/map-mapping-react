
import { getOrderDescription } from '../../helpers/FlightHelper'

const maxHourOffset = 24
const minHourOffset = 2
const randomCoeff = 0.8

export function generateFlights(maxTime, maxFlightId, airports, airportDistances) {
    if (Math.random() > randomCoeff) {
        const timeOffset = Math.round((Math.random() * (maxHourOffset - minHourOffset)  + minHourOffset))
        const flightLenght = 10
        const startTime = maxTime.clone().add(timeOffset, 'hours')
        const airportIds = [...airports]
        let index = Math.round(Math.random() * (airportIds.length - 1))
        const fromId = airportIds[index]
        airportIds.splice(index, 1)
        index = Math.round(Math.random() * (airportIds.length - 1))
        const toId =  airportIds[index]
        // TODO fuelCost в справочник
        const cost = airportDistances(fromId, toId) * 100
        const pay = cost + Math.round(1000 + Math.random() * 1000)
        const { title, description } = getOrderDescription()
        return [ 
            {
                pay,
                cost,
                description,
                id: maxFlightId + 1,
                name: `${title} ${maxFlightId + 1}`,
                tail: null,
                tailId: null,
                fromId: fromId,
                toId: toId,
                dateTakeOff: startTime,
                dateLanding: startTime.clone().add(flightLenght, 'hours'),
                status: 'planned',
                progress: -1,
            }
        ]
    }

    return []    
}