// TODO сделать через inmutable
import { MapActions } from '../constants/map-actions'

export function getFlightInTime(flight, airports, orders, currentTime ) {
    if (flight.orderId) {
        const order = orders[flight.orderId]
        flight.fromId = order.fromId
        flight.toId = order.toId
        flight.dateTakeOff = order.dateTakeOff
        flight.dateLanding = order.dateLanding
    }

    flight.from = {...airports[flight.fromId]}
    flight.to = {...airports[flight.toId]}
    const { dateTakeOff, dateLanding } = flight
    const oldProgress = flight.progress

    switch(true) {
        case (!dateTakeOff):
            flight.progress = -1
            flight.status = 'not takeOff'
            break
        case (!dateLanding):
            flight.progress = -1
            flight.progress = 0
            flight.status = 'not landing' 
            break   
        case (currentTime < dateTakeOff):
            flight.progress = -1
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
            flight.progress = 101
            flight.status = 'done'
            break
        case (dateTakeOff < currentTime && currentTime < dateLanding):  
            flight.progress = currentTime.diff(dateTakeOff) / 
                dateLanding.diff(dateTakeOff) * 100 
            flight.progressNext = currentTime.clone().add(1, 'hour').diff(dateTakeOff) / 
                dateLanding.diff(dateTakeOff) * 100      
            flight.status = 'in progress'    
            break
        default: break;
    }
    flight.mapAction = getMapAction(oldProgress, flight.progress)
    return flight
}

export function getMapAction(oldProgress, newProgress ) {
    if (oldProgress !== newProgress) {
        switch (true) {
            case oldProgress === -1 && newProgress > -1:
                return MapActions.ADD_FLIGHT
            case oldProgress > -1 && newProgress > -1: 
                return MapActions.CHANGE_PROGRESS       
            default: return MapActions.NONE
        }
    }
}