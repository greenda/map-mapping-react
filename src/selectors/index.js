import { createSelector } from 'reselect'

export const currentTimeSelector = (state) => state.time.currentTime
export const airportsSelector = (state) => state.airports
export const airportIdsSelector = (state) => Object.keys(state.airports).map(value => +value)
export const flightsSelector = (state) => state.flights
export const flightIdsSelector = (state) => Object.keys(state.flights).map(value => +value)

export const airportByIdSelector = createSelector(
    airportsSelector,
    (airports, id) => {
        console.log('airportSelector')
        return airports[id]
    }
)

export const flightByIdSelector = createSelector(
    currentTimeSelector,
    airportsSelector,
    flightsSelector,
    (_, { id }) => id,
    (currentTime, airports, flights, id) => {
        console.log('flightByIdSelector')
        const flight = {...flights[id]}
        flight.fromIata = airports[flight.from].iata
        flight.toIata = airports[flight.to].iata
        const { dateTakeOff, dateLanding } = flight

        // TODO В утилиту
        switch(true) {
            case (!dateTakeOff):
                flight.progress = 0
                flight.status = 'not takeOff'
                break
            case (!dateLanding):
                flight.progress = 0
                flight.status = 'not landing' 
                break   
            case (currentTime < dateTakeOff):
                flight.progress = 0
                // TODO статусы константами
                flight.status = 'planed'
                break
            case (currentTime.isSame(dateTakeOff)):
                flight.progress = 0
                flight.status = 'takeOff'
                break  
            case (currentTime.isSame(dateLanding)):
                flight.progress = 100
                flight.status = 'landing'
                break      
            case (currentTime > dateLanding):
                flight.progress = 100
                flight.status = 'done'
                break
            case (dateTakeOff < currentTime && currentTime < dateLanding):  
                flight.progress = currentTime.diff(dateTakeOff) / 
                    dateLanding.diff(dateTakeOff) * 100 
                flight.status = 'in progress'    
                break
            default: break;
        }

        return flight
    }

)
