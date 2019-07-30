import { useState } from 'react'
import moment from 'moment'
import { dateType, getUpdatedDateAndCost } from '../../../../helpers/FlightHelper'

export const useAddFlightForm = (airportDistances, fuelCost, maxTime, maxFlightId, onSubmit, onCancel) => {
    const defaultDateTakeOff = maxTime.utc().clone().add(1, 'hours')
    const defaultFromId = 1
    const defaultToId = 2
    const { dateLanding: defaultDateLanding, cost } = 
    getUpdatedDateAndCost(defaultDateTakeOff, dateType.TAKE_OFF, defaultFromId, 
                defaultToId, fuelCost, airportDistances)
    
    const defaultInputs = {
        cost,
        id: maxFlightId + 1,
        name: `Flight ${maxFlightId + 1}`,
        dateTakeOff: defaultDateTakeOff.format('YYYY-MM-DDTHH:mm'),
        dateLanding: defaultDateLanding.format('YYYY-MM-DDTHH:mm'),
        fromId: 1,
        toId: 11,
    }
    
    const [inputs, setInputs] = useState(defaultInputs)

    const hundleSubmit = (event) => {
        if (event) {
            event.preventDefault()
        }
        onSubmit({
            id: inputs.id,
            name: inputs.name,
            tail: null,
            tailId: null,
            fromId: +inputs.fromId,
            toId: +inputs.toId,
            dateTakeOff: moment.utc(inputs.dateTakeOff),
            dateLanding: moment.utc(inputs.dateLanding),       
            status: 'planned',
            progress: -1,
            orderId: null,
            cost: inputs.cost,
            pay: 0,
        })
    }

    const hundleCancel = () => {
        onCancel()
    }

    const hundleMaxTimeChange = () => {
        if (moment.utc(inputs.dateTakeOff).isBefore(maxTime)) {
            const dateTakeOff = maxTime.utc().clone();
            const { dateLanding, cost } = 
                getUpdatedDateAndCost(dateTakeOff, dateType.TAKE_OFF, inputs.fromId, inputs.toId, fuelCost, airportDistances)
            setInputs(inputs => ({ ...inputs, cost, 
                dateTakeOff: dateTakeOff.format('YYYY-MM-DDTHH:mm'),
                dateLanding: dateLanding.format('YYYY-MM-DDTHH:mm'), }))
        }
    }

    const handleInputChange = (event) => {  
        const dateTakeOff = moment.utc(getInputValue(event.target, 'dateTakeOff', inputs))
        const fromId =  getInputValue(event.target, 'fromId', inputs)
        const toId = getInputValue(event.target, 'toId', inputs)
        const { dateLanding, cost } = 
            getUpdatedDateAndCost(dateTakeOff, dateType.TAKE_OFF, fromId, toId, fuelCost, airportDistances)

        setInputs(inputs => ({ ...inputs, fromId, toId, cost,
            dateTakeOff:dateTakeOff.format('YYYY-MM-DDTHH:mm'), 
            dateLanding: dateLanding.format('YYYY-MM-DDTHH:mm')}))
    }

    const getInputValue = (target, name, inputs) => {
        return target.name === name ? target.value : inputs[name]
    }

    return { inputs, hundleSubmit, hundleCancel, handleInputChange, hundleMaxTimeChange} 
}

export default useAddFlightForm