import { combineReducers } from 'redux'
import { ordersReducer } from './orders'
import { tailsReducer } from './tailes'
import { flightsReducer } from './flights'
import { timeReducer } from './time'
import { airportsReducer } from './airports'
import { moneyReducer } from './money'
import { achievementsReducer } from './achievements'


export const rootReducer = combineReducers({
    orders: ordersReducer,
    tails: tailsReducer,
    flights: flightsReducer,
    time: timeReducer,
    airports: airportsReducer,
    money: moneyReducer,
    achievements: achievementsReducer,
});