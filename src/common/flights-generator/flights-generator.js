const maxHourOffset = 24
const minHourOffset = 2
const randomCoeff = 0

export function generateFlights(maxTime, maxFlightId, airports) {
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
        return [ 
            {
                id: maxFlightId + 1,
                name: `Flight ${maxFlightId + 1}`,
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