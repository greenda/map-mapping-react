export function getChainElement(budgetChain, flights) {
    return budgetChain.ids.reduce((result, flightId) => {
        const chainFlight = flights.find(flight => flight.id === flightId)
        const { dateTakeOff, dateLanding, cost, pay} = chainFlight
        if (!result) {
            return {
                startDate: dateTakeOff.clone(),
                endDate: dateLanding.clone(),
                // TODO Стоимость аэропорта
                saldo: pay - cost,                        
            }
        }
        
        if (result.startDate.isAfter(dateTakeOff)) {
            result.startDate = dateTakeOff.clone()
        }
        if (result.endDate.isBefore(chainFlight.dateTakeOff)) {
            result.endDate = dateTakeOff.clone()
        }
        return {...result,
            saldo: result.saldo + pay - cost
        } 
    }, null)
}