import { combineReducers } from 'redux';
import { ordersReducer } from './orders';
import { tailsReducer } from './tiles';
import { flightsReducer } from './flights';
import { timeReducer } from './time';
import { airportsReducer } from './airports'


export const rootReducer = combineReducers({
    orders: ordersReducer,
    tails: tailsReducer,
    flights: flightsReducer,
    time: timeReducer,
    airports: airportsReducer,
});