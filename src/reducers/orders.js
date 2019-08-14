import moment from 'moment'
import { pageActionTypes } from '../constants/action-types';
import { generateOrders } from '../common/orders-generator/orders-generator'
import { flightStatuses } from '../constants/flight-status'

const initialState = {
	items: {
		1: {
			id: 1,
			name: 'Кускус с овощами на подлете',
			fromId: 11,
			toId: 2,
			dateTakeOff: moment.utc('2000-01-01T12:00:00+00:00'),
			dateLanding: moment.utc('2000-01-01T20:00:00+00:00'),
			status: 'progress',
			progress: 16,
			orderId: 1,
			pay: 2000,
			cost: 1200,
			description: 'Груз кускуса чулок с овощами для праздника Лори',
		},
		2: {
			id: 2,
			name: 'Сколопендры к ужину',
			fromId: 14,
			toId: 15,
			dateTakeOff: moment.utc('2000-01-01T13:00:00+00:00'),
			dateLanding: moment.utc('2000-01-01T19:00:00+00:00'),
			status: flightStatuses.PLANED,
			progress: -1,
			pay: 3000,
			cost: 500,
			description: 'Груз сколопендр для семейного ужина в Бо–Кап',
		},
	}
}

export function ordersReducer(state = initialState, action) {
	const { type, payload = {} } = action

	switch (type) {
		case pageActionTypes.GENERATE_ORDERS:
			const { maxTime, maxFlightId, airports, airportDistances,
				fuelCost, isRequired } = payload
			const newOrders =
				generateOrders(maxTime, maxFlightId, airports, airportDistances, fuelCost, isRequired)
					.reduce((result, value) => {
						result[value.id] = value
						return result
					}, {})

			return { ...state, items: { ...state.items, ...newOrders } }
		default: return state;
	}
}
