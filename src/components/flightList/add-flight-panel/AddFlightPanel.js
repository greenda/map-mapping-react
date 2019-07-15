import React, { Component, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import moment from 'moment'
import './AddFlightPanel.scss'

// TODO вынести в справочник и привязать к аэропорту
const fuelCost = 100

// TODO разобраться с "" и ''
export class AddFlightPanel extends Component {

    state = {
        dateTakeOff: '2000-01-01T08:00',
        dateLanding: '2000-01-01T10:00:00+00:00',
        fromId: 1,
        toId: 2,
        cost: 0,
    }

    componentDidMount() {
        if (this.props.maxTime) {
            const dateTakeOff = this.props.maxTime.utc()
            const dateLanding = 
                this.getLandingTime(this.state.fromId, this.state.toId, dateTakeOff, this.props.airportDistances) 
            this.setState({ 
                cost: dateLanding.diff(dateTakeOff, 'hours') * fuelCost,
                dateTakeOff: dateTakeOff.format('YYYY-MM-DDTHH:mm'),
                dateLanding: dateLanding.format('YYYY-MM-DDTHH:mm'),
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.maxTime && 
            this.props.maxTime !== prevProps.maxTime && 
            moment.utc(this.state.dateTakeOff).isBefore(this.props.maxTime)) {
            this.setState({
                dateTakeOff: this.props.maxTime.utc().format('YYYY-MM-DDTHH:mm'),
                cost: this.state.dateLanding.diff(this.props.maxTime.utc(), 'hours') * fuelCost,
            })            
        }
      }

    render() {
        const airportSelect = (type) => {
            const sortedAirports = [...this.props.airports]
            sortedAirports.sort((a, b) => (a.iata < b.iata) ? -1: 1)
            return (
                <select className="airport-selector" value={this.state[type]} onChange={this.handleChange(type)}>
                    {sortedAirports.map(airport => <option value={airport.id} key={airport.id}>{airport.iata}</option>)}
                </select>
            )
        }
        return (
        <form className="flight__container" onSubmit={this.handleSubmit}>
            <div className="new-flight__header">
                <div className="new-flight__header__row">
                    <div className="new-flight__name">{this.state.name}</div>
                </div>
                <div className="new-flight__header__row">
                    <div className="new-flight__header__row right-offset">
                    <span className="right-offset__small">from:</span> {airportSelect('fromId')}</div>
                    <div className="new-flight__header__row right-offset">
                    <span className="right-offset__small">to:</span>{airportSelect('toId')}</div>
                </div>
                <div>takeOff:</div>
                <div className="new-flight__header__row bottom-offset">
                    <TextField
                        id="datetime-local"
                        type="datetime-local"
                        // TODO from state
                        InputProps={{ 
                            disableUnderline: true,
                            style: {fontSize: 14} 
                        }}
                        value={this.state.dateTakeOff}
                        onChange={this.handleChange('dateTakeOff')}
                    />                        
                </div>
                <div>landing</div>
                <div className="new-flight__header__row bottom-offset">
                    <TextField
                        id="datetime-local"
                        type="datetime-local"
                        className="date-input"
                        InputProps={{ 
                            disableUnderline: true,
                            style: {fontSize: 14, padding: '0px'} 
                        }}
                        value={this.state.dateLanding}
                        disabled
                        onChange={this.handleChange('dateLanding')}
                    />                        
                </div>
                <div className="new-flight__header__row left-align">
                    <span>cost: </span>
                    <span className="new-flight__cost">{this.state.cost}</span> 
                </div>
                <div className="new-flight__control-buttons">
                    <input type="button" value="Cancel" onClick={this.props.onCancel}/>
                    <input type="button" onClick={this.saveFlight} value="Save"/>
                </div>                    
            </div>
        </form>
        )        
    }

    saveFlight = () => {
        const newId = this.props.maxFlightId + 1
        const newFlight = {
            id: newId,
            name: 'Flight ' + newId,
            tail: null,
            tailId: null,
            fromId: +this.state.fromId,
            toId: +this.state.toId,
            dateTakeOff: moment.utc(this.state.dateTakeOff),
            dateLanding: moment.utc(this.state.dateLanding),       
            status: 'planned',
            progress: -1,
            orderId: null,
            cost: this.state.cost,
            pay: 0,
        }
        // TODO Перенести на уровень выше, вынести все в onSave
        this.props.addFlight(newFlight, newId)
        this.props.onSave()
    }

    handleChange = (type) => (ev) => {
        const { value } = ev.target
        this.setState({
          [type]: value
        })
        setTimeout(() => {
            const { fromId, toId, dateTakeOff } = this.state
            const dateLanding = 
                    this.getLandingTime(fromId, toId, moment.utc(dateTakeOff), this.props.airportDistances) 
            this.setState({
                dateLanding: dateLanding.format('YYYY-MM-DDTHH:mm'),
                cost: dateLanding.diff(moment.utc(dateTakeOff), 'hours') * fuelCost,
            })
        }, 0)
        
    }

    getLandingTime = (airport1Id, airport2Id, dateTakeOff, airportDistances) => {
        const flightTime = airportDistances(airport1Id, airport2Id)
        return dateTakeOff.clone().add(flightTime, 'hours')
    }
}

// TODO PropTypes
// onCancel
// onSave
// maxTime
// airportDistances

export default (AddFlightPanel)
