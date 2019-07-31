import { pageActionTypes } from '../constants/action-types';

const initialState = {
    currentBudget: 10000,
    budgetChains: []
}

export function moneyReducer(state = initialState, action) {
    const { type, payload = {} } = action
    const { flights, flight, flightId, maxTime, currentTime, tails } = payload
    const budgetChains = [...state.budgetChains]

    switch (type) {  
        case pageActionTypes.CHECK_MONEY:
            if (maxTime.isSame(currentTime)) {
                let budget = state.currentBudget
                flights.forEach(flight => {
                    if (flight.dateLanding && flight.dateLanding.isSame(currentTime)) {                        
                        budget = budget + flight.pay - flight.cost
                    }
                })
                
                tails.forEach(tail => {
                    if (tail.airport) {
                        // console.log('pay by airport ' + tail.airport.costOnHour)
                        budget = budget - tail.airport.costOnHour
                    }
                })
                return {...state, currentBudget: budget }
            }
            return state  
        case pageActionTypes.ADD_APPROACH_FLIGHT:
            
            const linkedChainIndex = budgetChains.findIndex(chain => {
                return chain.ids.includes(flight.linkedFlightId)
                })
            // TODO через mutable решить
            if (linkedChainIndex === -1) {
                const maxId = budgetChains.length > 0 ? budgetChains.map(chain => chain.id).sort((a, b) => a < b)[0] : -1
                budgetChains.push({
                    id: maxId + 1,
                    ids: [flight.id, flight.linkedFlightId],
                    tailId: flight.tailId,
                })
            } else {
                budgetChains[linkedChainIndex].ids.push(flight.id)
                budgetChains[linkedChainIndex].saldo = budgetChains[linkedChainIndex] - flight.cost
            }

            return {
                ...state,
                budgetChains,                
            }
        case pageActionTypes.REMOVE_FLIGHT:
                return {
                    ...state,
                    budgetChains: budgetChains.map(chain => {
                        if (chain.ids.includes(flightId)) {
                            chain.ids.splice(chain.ids.indexOf(flightId), 1)
                        }
                        return chain
                    }).filter(chain => chain.ids.length > 1)              
                }  
        case pageActionTypes.ADD_LICENCE:
            const { licence } = payload
            return {...state, currentBudget: state.currentBudget - licence.cost}
        default:
            return {...state}
    }
}