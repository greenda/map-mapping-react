import React, { useState } from 'react';
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend';
import * as d3 from 'd3'
import TimelineContainer from '../src/components/timeline/TimelineContainer'
import FlightListContainer from '../src/components/flightList/FlightListContainer'
import TailListContainer from '../src/components/tailList/TailListContainer'
import OrderListContainer from '../src/components/orderList/OrderListContainer'
import MapContainer from '../src/components/map/MapContainer'
import ScheduleTable from '../src/components/schedule/ScheduleTable'
import OrderSchedule from '../src/components/order-schedule/OrderSchedule'
import StoreContainer from '../src/components/store/StoreContainer'
import AchievementsContainer from '../src/components/achievements/AchievementsContainer'
import CongratulationContainer from './components/achievements/congratulation/CongratulationContainer'
import { licencedOrderIdsSelector, filteredFlightIdsSelector, maxFlightIdSelector,
         flightsSelector, tailCoordinates, currentTimeSelector, flightsOnTime,
         approachFlightBlancSelector, budgetChainsElementsSelector,
         maxOrderIdSelector } from '../src/selectors/index'
import { addApproachFlight } from './actions/pageActions'
import logo from '../src/assets/map-mapping-logo.svg'
import './App.scss';
import { useEffect } from 'react';

const tabNames = {
    MAP_TAB: 'mapTab',
    SCHEDULE_TAB: 'scheduleTab',
    STORE: 'store',
    ACHIEVEMENTS: 'achievements',
}

// TODO flights Вынести на этот уровень, чтобы два раза не просчитывать
// TODO уменьшить количество параметров
function App ({ orderIds, flights, tails, flightIds, maxFlightId, 
    flightsOnTime, currentTime, addApproachFlight, 
    blankApproachFlight, budgetChains, maxOrderId}) {
    
    const [countries, setCountries] = useState();
    const [selectedOrder, setSelectedOrder] = useState();
    useEffect(() => {
        if (!countries) {
            d3.json('world_countries.json').then((countries) => {
                setCountries(countries)
            }).catch(error => console.log(error))
        }
    })

    // const [tabName, setTabName] = useState(tabNames.MAP_TAB)
    const [tabName, setTabName] = useState(tabNames.SCHEDULE_TAB)
    //const [tabName, setTabName] = useState(tabNames.ACHIEVEMENTS)
    const getActiveClass = (name) => tabName === name ? 'active' : ''    
    const hundleOrderClick = (id) => setSelectedOrder(id)

    return (
        <>
            <CongratulationContainer className="congratulation-container"/>    
            <div className="main-container">            
                <div className="main-container__column main-container__flight-column">
                    <div className="logo-container">
                        <img src={logo} alt="logo"></img>   
                    </div>
                    <div className="section-container tails-section">
                        <div className="section-container__header">
                            <span>Tails</span>
                        </div>
                        {/* TODO tails передавать с этого уровня */}
                        <div className="section-container__content">
                            <TailListContainer />
                        </div>
                    </div>
                    <div className="section-container flights-section">
                        <div className="section-container__header">
                            <span>Flights</span>
                        </div>
                        <div className="section-container__content">
                            <FlightListContainer />
                        </div>
                    </div>
                    <div className="section-container orders-section">
                        <div className="section-container__header">
                            <span>Orders</span>
                        </div>
                        <div className="section-container__content">
                            <OrderListContainer selectedOrder={selectedOrder}/>
                        </div>
                    </div>
                </div>
                <div className="main-container__column main-container__map-column">
                <div className="map-column__header">
                    <div><TimelineContainer /></div>
                    <div className="map-column__tab-controls ">
                    <span className={`main-container__tab-control ${getActiveClass(tabNames.MAP_TAB)}`} 
                            onClick={() => setTabName(tabNames.MAP_TAB)}>Map</span>
                    <span className={`main-container__tab-control ${getActiveClass(tabNames.SCHEDULE_TAB)}`}
                            onClick={() => setTabName(tabNames.SCHEDULE_TAB)}>Shedule</span>
                    <span className={`main-container__tab-control ${getActiveClass(tabNames.STORE)}`}
                            onClick={() => setTabName(tabNames.STORE)}>Store</span>
                    <span className={`main-container__tab-control ${getActiveClass(tabNames.ACHIEVEMENTS)}`}
                            onClick={() => setTabName(tabNames.ACHIEVEMENTS)}>Achievements</span>
                    </div>
                </div>
                {getTabContent(tabName, tails, flightsOnTime, countries,
                    currentTime, budgetChains, blankApproachFlight, 
                    addApproachFlight, hundleOrderClick)}
                </div>                
            </div>
        </>
    );
}

    function getTabContent(
        tabName, tails, flights, countries,
        currentTime, budgetChains,
        blankApproachFlight, addApproachFlight,
        hundleOrderClick) {
    switch(tabName) {
        case tabNames.MAP_TAB: 
            return <MapContainer countries={countries} onOrderClick={hundleOrderClick}/>
        case tabNames.SCHEDULE_TAB: 
            return (
                <div className="schedules__container">
                    <ScheduleTable tails={tails} 
                        flights={flights}
                        currentTime={currentTime}
                        budgetChains={budgetChains}
                        addApproachFlight={addApproachFlight}
                        blankApproachFlight={blankApproachFlight}/>
                    <div className="schedules__line"></div>
                    <OrderSchedule currentTime={currentTime}/>
                </div>
            )
        case tabNames.STORE:
            return (<StoreContainer />)
        case tabNames.ACHIEVEMENTS:
             return (<AchievementsContainer />)
        default: return (<></>)
    }          
    }

    export default DragDropContext(HTML5Backend)(
        connect(
        (state) => ({
            orderIds: licencedOrderIdsSelector(state),
            maxOrderId: maxOrderIdSelector(state),
            flightIds: filteredFlightIdsSelector(state),   
            flights: flightsSelector(state),
            flightsOnTime: flightsOnTime(state),
            maxFlightId: maxFlightIdSelector(state),  
            tails: tailCoordinates(state),
            currentTime: currentTimeSelector(state),
            blankApproachFlight: approachFlightBlancSelector(state),
            budgetChains: budgetChainsElementsSelector(state),      
        }),
        { addApproachFlight }
    )(App)
    );

