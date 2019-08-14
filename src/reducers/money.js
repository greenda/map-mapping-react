import { pageActionTypes } from '../constants/action-types'
import { flightStatuses } from '../constants/flight-status'

const initialState = {
    currentBudget: 1000,
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
                    if (flight.status !== flightStatuses.CANCELED && 
                        flight.dateLanding && 
                        flight.dateLanding.isSame(currentTime)) {                        
                        budget = budget + flight.pay - flight.cost
                    }
                })
                
                tails.forEach(tail => {
                    if (tail.airport) {
                        budget = budget - tail.airport.costOnHour
                    }
                })
                return {...state, currentBudget: budget }
            }
            return state  
        case pageActionTypes.ADD_APPROACH_FLIGHT:
            if (flight.fromId !== flight.toId) {
                const linkedChainIndex = budgetChains.findIndex(chain => {
                    return chain.ids.includes(flight.linkedFlightId)
                    })

                if (linkedChainIndex === -1) {
                    const maxId = budgetChains.length > 0 ? budgetChains.map(chain => chain.id).sort((a, b) => a < b)[0] : -1

                    return { ...state, budgetChains: 
                        [ ...budgetChains, {
                            id: maxId + 1,
                            ids: [ flight.id, flight.linkedFlightId ],
                            tailId: flight.tailId,
                        }]}
                } 
                
                return { ...state, budgetChains: budgetChains.map(chain => {
                    if (chain.id === linkedChainIndex) {
                        return { 
                            ids: [ ...chain.ids, flight.id ], 
                            saldo: budgetChains[linkedChainIndex] - flight.cost
                        }
                    }
                    return chain
                })}  
            }
            return state
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
            return { ...state, currentBudget: state.currentBudget - licence.cost }
        case pageActionTypes.ADD_TAIL: 
            const { cost } = payload
            return { ...state,  currentBudget: state.currentBudget - cost }
        default:
            return { ...state }
    }
}