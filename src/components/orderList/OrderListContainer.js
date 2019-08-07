import React, { useEffect, useState } from 'react'
import PropTypes, { number, string } from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import { maxFlightIdSelector, maxTimeSelector,
    airportsSelector, distanceBetweenAirportsSelector,
    fuelCostSelector, licencedOrderIdsSelector,
    maxOrderIdSelector, 
} from '../../selectors/index'
import { 
    addOrder,
    createFlightFromOrder,
    generateOrders 
} from '../../actions/pageActions'
import OrderListView from './OrderListView'

export function OrderListContainer({
    orderIds, maxOrderId, maxTime, 
    generateOrders, airportDistances, 
    airports, addOrder, createFlightFromOrder, 
    maxFlightId, selectedOrder, fuelCost}) {
    const [didMount, setDidMount] = useState(false)

    useEffect(() => {                
        generateOrders(maxTime, maxOrderId, airports, 
            airportDistances, fuelCost, !didMount)
        setDidMount(true)
    }, [maxTime])

    return (
        <OrderListView 
            orderIds={orderIds}
            addOrder={addOrder}
            createFlightFromOrder={createFlightFromOrder}
            maxFlightId={maxFlightId}
            selectedOrder={selectedOrder}
        />
    )
}

OrderListContainer.propTypes = {
    orderIds: PropTypes.arrayOf(number),
    maxOrderId: number,
    maxTime: PropTypes.instanceOf(moment), 
    generateOrders: PropTypes.func,
    airportDistances: PropTypes.func,
    airports: PropTypes.arrayOf(
        PropTypes.shape({ 
            id: number,
            name: string,
            iata: string,
            countriesId: number,
            latt: number,
            longt: number,
            costOnHour: number,
        })
    ),
    addOrder: PropTypes.func,
    createFlightFromOrder: PropTypes.func,
    maxFlightId: number,
    selectedOrder: number,
    fuelCost: number,
}

export default connect(
    (state) => ({
        orderIds: licencedOrderIdsSelector(state),
        maxOrderId: maxOrderIdSelector(state),
        maxTime: maxTimeSelector(state), 
        airports: airportsSelector(state),       
        airportDistances: distanceBetweenAirportsSelector(state),
        maxFlightId: maxFlightIdSelector(state),
        fuelCost: fuelCostSelector(state),
    }),
    { generateOrders, addOrder, createFlightFromOrder }
)(OrderListContainer)
