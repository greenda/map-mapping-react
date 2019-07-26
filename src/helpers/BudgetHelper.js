export function getChainElement(budgetChain, flights, newId) {
    return budgetChain.ids.reduce((result, flightId) => {
        const chainFlight = flights.find(flight => flight.id === flightId)
        const { dateTakeOff, dateLanding, cost, pay} = chainFlight
        if (!result) {
            return {
                id: newId,
                startDate: dateTakeOff.clone(),
                endDate: dateLanding.clone(),
                // TODO Стоимость аэропорта
                saldo: pay - cost,  
                tailId: chainFlight.tailId,                      
            }
        }
        
        if (result.startDate.isAfter(dateTakeOff)) {
            result.startDate = dateTakeOff.clone()
        }
        if (result.endDate.isBefore(dateLanding)) {
            result.endDate = dateLanding.clone()
        }
        return {...result,
            saldo: result.saldo + pay - cost
        } 
    }, null)
}