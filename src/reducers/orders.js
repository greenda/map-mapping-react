import moment from 'moment'
import { pageActionTypes } from '../constants/action-types';
import { generateFlights } from '../common/flights-generator/flights-generator'

const initialState = {
    items: {
        1: {
          id: 1,
          name: 'Order 1',
          fromId: 1,
          toId: 2,
          dateTakeOff: moment.utc('2000-01-01T08:00:00+00:00'),
          dateLanding: moment.utc('2000-01-01T20:00:00+00:00'),
          status: 'progress',
          progress: 16,
          orderId: 1,
          pay: 2000,
          cost: 1200,
          description: 'Груз кускуса с овощами для праздника Лори',
        },    
        2: {
          id: 2,
          name: 'Order 2',
          fromId: 1,
          toId: 3,
          dateTakeOff: moment.utc('2000-01-01T11:00:00+00:00'),
          dateLanding: moment.utc('2000-01-01T16:00:00+00:00'),
          status: 'planed',
          progress: -1,
          pay: 3000,
          cost: 500,
          description: 'Груз сколопендр для семейного ужина в Бо–Кап',
          },
        3: {
          id: 3,
          name: 'Order 3',
          tail: null,
          fromId: 3,
          toId: 2,
          dateTakeOff: moment.utc('2000-01-01T18:00:00+00:00'),
          dateLanding: moment.utc('2000-01-01T24:00:00+00:00'),
          status: 'planed',
          progress: -1,
          pay: 2300,
          cost: 600,
          description: 'Груз алмазов для ювелирной мастерской в старом городе',
        }
    }
}

export function ordersReducer(state = initialState, action) {
  const { type, payload = {} } = action
  // const { flightId } = payload
  // const flight = flightId ? state[flightId] : {};
  switch (type) {  
    case pageActionTypes.GENERATE_ORDERS:
      const { maxTime, maxFlightId, airports, airportDistances } = payload
      // TODO переименовать в generateOrders
      const newOrder = generateFlights(maxTime, maxFlightId, airports, airportDistances)
      const result = {...state}      
      // TODO inmuttable
      newOrder.forEach((value) => {
        result.items[value.id] = value
      })
      
      return {...result}
    default: return state;
  }
}
