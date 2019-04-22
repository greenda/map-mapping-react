import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import * as d3 from 'd3'
import  Tail from '../src/components/Tail';
import { addTail } from './actions/pageActions';
import Timeline from '../src/components/timeline/Timeline'
import FlightList from '../src/components/flightList/FlightList'

class App extends Component {
  componentDidMount() {
    console.log('componentDidMount')
    d3.json('world_countries.json')
      .then((countries) => {
        console.log('countries')
        this.showMapBackground(countries)
      })
      .catch(error => console.log(error))
  }

  showMapBackground(data) {
    const width = 800
    const height = 400
    const svg = d3.select('#mapa')
                  .attr("width", width)
                  .attr("height", height)
                  .attr('fill', 'green')
                  .append('g')
                  .attr('class', 'map')
    const projection = d3.geoEquirectangular()
                        .scale(130)
                        .translate( [width / 2, height / 2])
    const path = d3.geoPath().projection(projection)
    svg.append("g")
       .attr("class", "countries")
       .selectAll("path")
       .data(data.features)
       .enter()
       .append("path")
       .attr("d", path)
       .style('stroke', 'gray')
       .style('stroke-width', 0.5)
       .style('fill', 'white')

    const points = [[3.22, 36.69], [77.96, 27.15], [18.6, -33.96]]

    svg.selectAll('circle')
       .data(points)
       .enter()
       .append('circle')
       .attr('cx', (d) =>  projection(d)[0] )
       .attr('cy', (d) => projection(d)[1])
       .attr('r', '6px')
       .attr('fill', '#ff9800')   
       .attr('stroke', 'black')

    const lines = [
      {"type": "LineString", "coordinates": [[3.22, 36.69], [77.96, 27.15]], "id": 1},
      {"type": "LineString", "coordinates": [[3.22, 36.69], [18.6, -33.96]], "id": 2 }
    ]

    svg.append("g")
       .attr("class", "lines")
       .selectAll("path")
       .data(lines)
       .enter()
       .append("path")
       .attr('class', (d) => 'line' + d.id)
       .attr("d", path)
       .attr('fill', 'none')   
       .attr('stroke', 'black') 
    
    const line2 = svg.select('.line2').node()
    const lineLenght = line2.getTotalLength()
    const aircraft = line2.getPointAtLength(0.7 * lineLenght)
    console.log(lineLenght)

    svg.append("g")
       .attr("class", "aircraft")
       .selectAll('circle')
       .data([[aircraft.x, aircraft.y]])
       .enter()
       .append('circle')
       .attr('cx', (d) => d[0] )
       .attr('cy', (d) => d[1])
       .attr('r', '6px')
       .attr('fill', 'red')   
       .attr('stroke', 'black')
  }

  // translateAlong(path) {
  //   var l = path.getTotalLength();
  //   return (d, i, a) => {
  //     return (t) = > {
  //       const p = path.getPointAtLength(t * l);
  //       return "translate(" + p.x + "," + p.y + ")";
  //     };
  //   };
  // }

  render() {
    let array = [];
    for(let i = 0; i < this.props.tails.tails.length; i++) {
      let item = this.props.tails.tails[i]
      array.push(
        <Tail key={item.id} id={item.id} 
              name={item.name}
              addTailAction={this.props.addTailAction}>
        </Tail>
      );
    }
  
    return (
      <DragDropContextProvider backend={HTML5Backend}>
      
       <h4>Map-mapping is here!</h4>
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
            <svg id="mapa" className="map__container"></svg>
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
