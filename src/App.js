import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import  Tail from '../src/components/Tail';
import Flight from '../src/components/Flight';
import { addTail } from './actions/pageActions';
import Timeline from '../src/components/timeline/Timeline'

class App extends Component {
  render() {
    let array = [];
    for(let i = 0; i < this.props.tails.tails.length; i++) {
      let item = this.props.tails.tails[i]
      array.push(
        <Tail id={item.id} 
              name={item.name}
              addTailAction={this.props.addTailAction}>
        </Tail>
      );
    }

    let flights = [];
    for(let i = 0; i < this.props.flights.flights.length; i++) {
      let item = this.props.flights.flights[i]
      flights.push(
        <Flight id={item.id}
                name={item.name}
                tail={item.tail}>
        </Flight>
      );
    }

    return (
      <DragDropContextProvider backend={HTML5Backend}>
      
       <h1>Map-mapping is here!</h1>
       <Timeline />
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
              {flights}
            </div>
          </div>    
        </div>    
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
