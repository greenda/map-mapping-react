import React, { Component, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import moment from 'moment'
import './AddFlightPanel.scss'

// TODO разобраться с "" и ''
export class AddFlightPanel extends Component {

    state = {
        dateTakeOff: '2000-02-01T08:00:00+00:00',
        dateLanding: '2000-02-01T10:00:00+00:00',
        fromId: 1,
        toId: 2,
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
                        defaultValue="2000-02-01T08:00"
                        InputProps={{ 
                            disableUnderline: true,
                            style: {fontSize: 14} 
                        }}
                        onChange={this.handleChange('dateTakeOff')}
                    />                        
                </div>
                <div>landing</div>
                <div className="new-flight__header__row bottom-offset">
                    <TextField
                        id="datetime-local"
                        type="datetime-local"
                        defaultValue="2000-02-01T10:00"
                        className="date-input"
                        InputProps={{ 
                            disableUnderline: true,
                            style: {fontSize: 14, padding: '0px'} 
                        }}
                        onChange={this.handleChange('dateLanding')}
                    />                        
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
    }
}

// TODO PropTypes
// onCancel
// onSave

export default (AddFlightPanel)
