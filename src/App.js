import React, { Component } from 'react';
import './App.scss';
import { connect } from 'react-redux';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import  Tail from '../src/components/tailList/tail/Tail';
import { addTail } from './actions/pageActions';
import Timeline from '../src/components/timeline/Timeline'
import FlightList from '../src/components/flightList/FlightList'
import TailList from '../src/components/tailList/TailList'
import MapContainer from '../src/components/map/MapContainer'
import logo from '../src/assets/map-mapping-logo.svg'

class App extends Component {
  render() {
    let array = [];
    for(let i = 0; i < this.props.tails.length; i++) {
      let item = this.props.tails[i]
      array.push(
        <Tail key={item.id} id={item.id} 
              name={item.name}
              airportId={item.airportId}
              addTailAction={this.props.addTailAction}>
        </Tail>
      );
    }
  
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div className="main-container">
          <div className="main-container__column main-container__flight-column">
            <div className="logo-container">
              <img src={logo} alt="logo"></img>   
            </div>
            <div className="section-container tails-section">
              <div className="section-container__header"><span>Tails</span></div>
              <div className="section-container__content"><TailList /></div>
            </div>
            <div className="section-container flights-section">
              <div className="section-container__header"><span>Flights</span></div>
              <div className="section-container__content"><FlightList /></div>
            </div>
          </div>
          <div className="main-container__column main-container__map-column">
            <div><Timeline /></div>
            <MapContainer />
          </div>
        </div>
       {/* <h4>Map-mapping is here!</h4>
       <div className="timeline__container">
        <Timeline />
       </div>
        <div className="page__container">
          <div>
            <div className="tails__container">        
              <h2 className="tails__header">Tails</h2>
              {array}
            </div>
          </div>
          <div>
            <div className="flights__container">        
              <h2 className="flights__header">Flights</h2>
              <FlightList />
            </div>
          </div>   
          <div>           
            <MapContainer />
          </div> 
        </div>     */}
      </DragDropContextProvider>      
    );
  }
}

const mapStateToProps = store => {
  return {
    orders: store.orders,
    tails: store.tails,
    flights: store.flights,
  }
}

const mapDispatchProps = dispatch => {
  return {
    addTailAction: (tail, flightId) => dispatch(addTail(tail, flightId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchProps,
)(App);

