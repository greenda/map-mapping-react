import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import  Tail from '../src/components/Tail';
import Flight from '../src/components/Flight';

class App extends Component {
  render() {
    let array = [];
    // TODO actions для добавления в список
    for(let i = 0; i < this.props.tails.tails.length; i++) {
      let item = this.props.tails.tails[i]
      array.push(
        <Tail id={item.id} name={item.name}></Tail>
        // <div className="tails__item" id={item.id} >{item.name}</div>
      );
    }

    let flights = [];
    for(let i = 0; i < this.props.flights.flights.length; i++) {
      let item = this.props.flights.flights[i]
      flights.push(
        <Flight id={item.id} name={item.name}></Flight>
        // <div className="tails__item" id={item.id} >{item.name}</div>
      );
    }

    return (
      <DragDropContextProvider backend={HTML5Backend}>
       <h1>Map-mapping is here!</h1>
        <div className="page__container">
          <div>
            <div className="tails__container">        
              <h2 className="tails__header">Tails</h2>
              {array}
            </div>
          </div>
          <div>
            <div className="flights__container">        
              <h2 className="flights__header">Tails</h2>
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

export default connect(mapStateToProps)(App);
