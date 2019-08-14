import { combineReducers } from 'redux'
import { ordersReducer } from './orders'
import { tailsReducer } from './tailes'
import { flightsReducer } from './flights'
import { timeReducer } from './time'
import { geographyReducer } from './geography'
import { moneyReducer } from './money'
import { achievementsReducer } from './achievements'


export const rootReducer = combineReducers({
    orders: ordersReducer,
    tails: tailsReducer,
    flights: flightsReducer,
    time: timeReducer,
    geography: geographyReducer,
    money: moneyReducer,
    achievements: achievementsReducer,
});