import React from 'react';
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend';
import Timeline from '../src/components/timeline/Timeline'
import FlightList from '../src/components/flightList/FlightList'
import TailList from '../src/components/tailList/TailList'
import OrderList from '../src/components/orderList/OrderList'
import MapContainer from '../src/components/map/MapContainer'
import { orderIdsSelector, flightIdsSelector, maxFlightIdSelector, flightsSelector } from '../src/selectors/index'
import logo from '../src/assets/map-mapping-logo.svg'
import './App.scss';
// TODO flights Вынести на этот уровень, чтобы два раза не просчитывать
function App ({ orderIds, flights, flightIds, maxFlightId }) {
  return (
    
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
              <div className="section-container__content"><FlightList flightIds={flightIds} maxFlightId={maxFlightId}/></div>
            </div>
            <div className="section-container orders-section">
              <div className="section-container__header"><span>Orders</span></div>
              <div className="section-container__content"><OrderList orderIds={orderIds}/></div>
            </div>
          </div>
        <div className="main-container__column main-container__map-column">
          <div><Timeline flights={flights} /></div>
          <MapContainer />
        </div>
      </div>
  );
}

export default DragDropContext(HTML5Backend)(
    connect(
    (state) => ({
      orderIds: orderIdsSelector(state),
      flightIds: flightIdsSelector(state),   
      flights: flightsSelector(state),
      maxFlightId: maxFlightIdSelector(state),   
    })
  )(App)
);

