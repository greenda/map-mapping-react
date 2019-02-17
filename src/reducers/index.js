import { combineReducers } from 'redux';
import { ordersReducer } from './orders';
import { tailsReducer } from './tiles';
import { flightsReducer } from './flights';


export const rootReducer = combineReducers({
    orders: ordersReducer,
    tails: tailsReducer,
    flights: flightsReducer,
});