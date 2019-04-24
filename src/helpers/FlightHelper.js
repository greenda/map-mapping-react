export function getFlightInTime(flight, airports, currentTime ) {
    flight.fromIata = airports[flight.from].iata
    flight.toIata = airports[flight.to].iata
    const { dateTakeOff, dateLanding } = flight

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