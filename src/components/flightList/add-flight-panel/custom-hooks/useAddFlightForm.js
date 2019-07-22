import { useState } from 'react'
import moment from 'moment'

export const useAddFlightForm = (airportDistances, fuelCost, maxTime, maxFlightId, onSubmit, onCancel) => {
    const defaultDateTakeOff = maxTime.utc().clone()
    const defaultFromId = 1
    const defaultToId = 2
    const { dateLanding: defaultDateLanding, cost } = 
            getUpdatedLandingTimeAndCost(defaultDateTakeOff, defaultFromId, 
                defaultToId, fuelCost, airportDistances)
    
    const defaultInputs = {
        cost,
        id: maxFlightId + 1,
        name: `Flight ${maxFlightId + 1}`,
        dateTakeOff: defaultDateTakeOff.format('YYYY-MM-DDTHH:mm'),
        dateLanding: defaultDateLanding.format('YYYY-MM-DDTHH:mm'),
        fromId: defaultFromId,
        toId: defaultToId,
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
                getUpdatedLandingTimeAndCost(dateTakeOff, inputs.fromId, inputs.toId, fuelCost, airportDistances)
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
            getUpdatedLandingTimeAndCost(dateTakeOff, fromId, toId, fuelCost, airportDistances)

        setInputs(inputs => ({ ...inputs, fromId, toId, cost,
            dateTakeOff:dateTakeOff.format('YYYY-MM-DDTHH:mm'), 
            dateLanding: dateLanding.format('YYYY-MM-DDTHH:mm')}))
    }

    const getInputValue = (target, name, inputs) => {
        return target.name === name ? target.value : inputs[name]
    }

    return { inputs, hundleSubmit, hundleCancel, handleInputChange, hundleMaxTimeChange} 
}

const getLandingTime = (airport1Id, airport2Id, dateTakeOff, airportDistances) => {
    const flightTime = airportDistances(airport1Id, airport2Id)
    return dateTakeOff.clone().add(flightTime, 'hours')
}

const getCost = (dateTakeOff, dateLanding, fuelCost) => {
    return dateLanding.diff(moment.utc(dateTakeOff), 'hours') * fuelCost
}

const getUpdatedLandingTimeAndCost = (dateTakeOff, airport1Id, airport2Id, fuelCost, airportDistances) => {
    const dateLanding = getLandingTime(airport1Id, airport2Id, dateTakeOff, airportDistances)
    const cost = getCost(dateTakeOff, dateLanding, fuelCost)
    return { dateLanding, cost }
}

export default useAddFlightForm