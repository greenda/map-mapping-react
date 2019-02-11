import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Map-mapping is here!</h1>
        {this.props.tails.tails[0].name}
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    orders: store.orders,
    tails: store.tails,

  }
}

export default connect(mapStateToProps)(App);
