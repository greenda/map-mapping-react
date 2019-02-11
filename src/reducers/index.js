import { combineReducers } from 'redux';
import { ordersReducer } from './orders';
import { tailsReducer } from './tiles';

export const rootReducer = combineReducers({
    orders: ordersReducer,
    tails: tailsReducer,
});