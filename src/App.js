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
import ScheduleTableContainer from './components/schedule/ScheduleTableContainer'
import OrderScheduleContainer from './components/order-schedule/OrderScheduleContainer';
import StoreContainer from '../src/components/store/StoreContainer'
import AchievementsContainer from '../src/components/achievements/AchievementsContainer'
import CongratulationContainer from './components/achievements/congratulation/CongratulationContainer'
import { addApproachFlight, checkCanceled } from './actions/pageActions'
import {
    maxTimeSelector,
    tailCoordinates, 
    ordersSelector,
} from './selectors/index'
import logo from '../src/assets/map-mapping-logo.svg'
import './App.scss';
import { useEffect } from 'react';

const tabNames = {
    MAP_TAB: 'mapTab',
    SCHEDULE_TAB: 'scheduleTab',
    STORE: 'store',
    ACHIEVEMENTS: 'achievements',
}

function App ({ maxTime, tails, orders, checkCanceled }) {
    const [countries, setCountries] = useState();
    const [selectedOrder, setSelectedOrder] = useState();
    useEffect(() => {
        if (!countries) {     
            d3.json('world_countries.json').then((countries) => {
                setCountries(countries)
            }).catch(error => console.log(error))
        }
    }, [maxTime])

    useEffect(() => {
        checkCanceled(tails, orders, maxTime)
    }, [ maxTime ])

    const [tabName, setTabName] = useState(tabNames.SCHEDULE_TAB)

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
                {getTabContent(tabName, countries, hundleOrderClick)}
                </div>                
            </div>
        </>
    );
}

    function getTabContent(tabName, countries, hundleOrderClick) {
    switch(tabName) {
        case tabNames.MAP_TAB: 
            return <MapContainer countries={countries} onOrderClick={hundleOrderClick}/>
        case tabNames.SCHEDULE_TAB: 
            return (
                <div className="schedules__container">
                    <ScheduleTableContainer />
                    <div className="schedules__line"></div>
                    <OrderScheduleContainer />
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
        connect((state) => ({
            maxTime: maxTimeSelector(state),
            tails: tailCoordinates(state),
            orders: ordersSelector(state),
        }), 
        { addApproachFlight, checkCanceled })(App)
    );

