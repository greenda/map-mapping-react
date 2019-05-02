import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'
import { PropTypes } from 'prop-types'
import { getMapAction } from '../../helpers/FlightHelper'
import { MapActions } from '../../constants/map-actions'
import './MapView.css'
import aircraftIcon from '../../assets/aircraft-icon.svg'
import aircraftIconRed from '../../assets/aircraft-icon__red.svg'
import aircraftIconGray from '../../assets/aircraft-icon__gray.svg'
const width = 800
const height = 400

export function MapView({flights, tails}) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [svg, setSvg] = useState()
                
    const projection = d3.geoEquirectangular()
                        .scale(130)
                        .translate( [width / 2, height / 2])
    const path = d3.geoPath().projection(projection)
    
    useEffect(() => {
        d3.json('world_countries.json')
        .then((countries) => {
            const svg = d3.select('#mapa')
                .attr("width", width)
                .attr("height", height)
                .attr('fill', 'green')
            showMapBackground(svg, path, countries)
            initLines(svg, path, projection, flights)
            initAircraft(svg, path, projection, tails, flights)
            setIsLoaded(true)
            setSvg(svg)
        })
        .catch(error => console.log(error))
    }, [])
    useEffect(() => {
        if (isLoaded) {
            // updateLines(svg, path, projection, flights)  
            initLines(svg, path, projection, flights)
            updateAircrafts(svg, path, projection, tails, flights)
        //     // TODO хранить svg в хуках
        //     const svg = d3.select('#mapa')

        //     const line2 = svg.select('.line2').node()
        //     // TODO в функцию
        //     const lineLenght = line2.getTotalLength()
        //     const aircraft = line2.getPointAtLength(Math.floor(flights[0].progress) / 100 * lineLenght)
        //     svg.select('.aircraft')
        //        .select('circle')
        //        .transition()
        //        .duration(1000) 
        //        .ease(d3.easeLinear)
        //        .attr('cx', () => aircraft.x )
        //        .attr('cy', () => aircraft.y)
        }
    }, [flights])

    return (
        <div>
            <svg id="mapa" className="map__container"></svg>
        </div>
    )
}

// MapView.propTypes = {
//     flights: PropTypes.arrayOf(PropTypes.shape({
//         id: PropTypes.number,
//         name: PropTypes.string,
//         tail: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string}),
//         fromIata: PropTypes.string,
//         toIata: PropTypes.string,
//         dateTakeOff: PropTypes.object,
//         dateLanding: PropTypes.object,
//         status: PropTypes.string,
//         tails
//     }))
// }

    function showMapBackground(svg, path, data) {
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
    }


    // TODO Переименовать в updateRoutes
    function initLines(svg, path, projection, flights) {   
        const currentFlights = flights.filter(value => 0 <= value.progress && value.progress <= 100)
        const lines = currentFlights.map(flight => getFlightLine(flight))

        console.log()
        
        if (svg.select('.routes').empty()) {
            svg.append("g")
               .attr("class", "routes")
        } else {
            svg.select('.routes').select('.routes__lines').remove()
            svg.select('.routes').select('.routes__airports').remove()
        }
        
        svg.select('.routes')
           .append("g")
           .attr("class", "routes__lines")
           .selectAll("path")
           .data(lines)
           .enter()
           .append("path")
           .attr('id', d => d.id)
           .attr('class', d => 'line' + d.id)
           .attr("d", path)
           .attr('fill', 'none')  
           .attr('stroke', 'black')


        svg.select('.routes__lines').selectAll('path').nodes().forEach((path) => {
                const length = path.getTotalLength()
                d3.select(path)
                  .attr('stroke-dasharray', length) 
                  .attr('stroke-dashoffset', length)
                  .transition()
                  .duration(1000) 
                  .attr('stroke-dashoffset', 0)
            }
        )
           
        
        const pointsMap = new Map()
        currentFlights.forEach(value => {
            pointsMap.set(value.from.id, value.from)
            pointsMap.set(value.to.id, value.to)
        })
        
        const points = Array.from(pointsMap.values())
        svg.select(".routes")
            .append("g")
            .attr("class", "routes__airports")
            .selectAll('circle')
            .data(points.map(value => [value.longt, value.latt]))
            .enter()
            .append('circle')
            .attr('cx', (d) =>  projection(d)[0] )
            .attr('cy', (d) => projection(d)[1])
            .attr('r', '6px')
            .attr('fill', '#ff9800')   
            .attr('stroke', 'black')

        // const lineNodes = svg.selectAll('.routes').selectAll('.routes__lines').selectAll('path').nodes()
        // const aircrafts = lineNodes.map(line => {
        //     const id = +line.getAttribute('id')
        //     const flight = flights.find(value => value.id = id)
        //     const totalLenght = line.getTotalLength()
        //     const aircraftPosition = line.getPointAtLength(flight.progress / 100 * totalLenght)
        //     const aircraftPositionNext = line.getPointAtLength(flight.progressNext / 100 * totalLenght)
        //     return [[aircraftPosition.x, aircraftPosition.y], [aircraftPositionNext.x, aircraftPositionNext.y]]
        // })

        // svg.select('.routes')
        // .append("g")
        // .attr("class", "routes__aircraft")
        // .selectAll('circle')
        // .data(aircrafts)
        // .enter()
        // .append('circle')
        // .attr('r', '6px')
        // .attr('fill', 'red')   
        // .attr('stroke', 'black')
        // .attr('cx', (d) => d[0][0] )
        // .attr('cy', (d) => d[0][1])
        // .transition()
        // .duration(1000) 
        // .ease(d3.easeLinear)
        // .attr('cx', (d) => d[1][0] )
        // .attr('cy', (d) => d[1][1])     
    }

    function initAircraft(svg, path, projection, tails, flights) {
        console.log('initAircraft')
        const lineNodes = svg.selectAll('.routes').selectAll('.routes__lines').selectAll('path').nodes()
        const aircraftsOnAir = lineNodes.map(line => {
            const id = +line.getAttribute('id')
            const flight = flights.find(value => value.id = id)
            const totalLenght = line.getTotalLength()
            const aircraftPosition = line.getPointAtLength(flight.progress / 100 * totalLenght)
            const nextPosition = line.getPointAtLength(flight.progress + 1 / 100 * totalLenght)
            const angle = Math.atan2(aircraftPosition.y - nextPosition.y, aircraftPosition.x - nextPosition.x) * 180 / Math.PI;
            console.log(angle)
            // translateAlong(line)
            return { angle, id: flight.tailId, coordinates: [aircraftPosition.x, aircraftPosition.y] }
        })

        // TODO зарефакторить этот момент
        const aircrafts = tails.map(tail => {
            const tailOnAir = aircraftsOnAir.find(tailOnAir => tailOnAir.id === tail.id) 
            console.log('tailOnAir ' + tailOnAir)
            // TODO onFlight в селектор

            return tailOnAir ? {...tailOnAir, coordinates: tailOnAir.coordinates, onFlight: true } : 
                { ...tail, coordinates: projection(tail.coordinates), onFlight: false }
        })

        // svg.append("g")
        //     .attr("class", "routes__aircraft")
        //     .selectAll('circle')
        //     .data(aircrafts)
        //     .enter()
        //     .append('circle')
        //     .attr('r', '6px')
        //     .attr('fill', d => d.onFlight ? 'red' : 'gray')   
        //     .attr('stroke', 'black')
        //     .attr('cx', d => d.coordinates[0] )
        //     .attr('cy', d => d.coordinates[1])
            // .transition()
            // .duration(1000) 

        svg.append("g")
           .attr("class", "routes__aircraft")
           .selectAll('image')
           .data(aircrafts)
           .enter()
           .append('image')
           .attr('xlink:href', d => d.onFlight ? aircraftIconRed : aircraftIconGray)
           .attr('width', 20)
           .attr('height', 20)
           .attr('x', d => d.coordinates[0] - 10)
           .attr('y', d => d.coordinates[1] - 10)
           .attr('transform', d => `rotate(${d.angle ? d.angle : -90} ${d.coordinates[0]} ${d.coordinates[1]})`)
           
           // 'translate(" + p1.x + "," + p1.y + ")rotate(" + angle + ")
            // <image x="10" y="20" width="80" height="80" xlink:href="recursion.svg" />   
    }

    // TODO для вращения символа
    // function translateAlong(path) {
    //     var l = path.getTotalLength();
    //     return function(d, i, a) {
    //     return function(t) {
    //         atLength = direction === 1 ? (t * l) : (l - (t * l));
    //         var p1 = path.getPointAtLength(atLength),
    //             p2 = path.getPointAtLength((atLength)+direction),
    //             angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
    //         label.text(Math.round(angle) + "°");
    //         return "translate(" + p1.x + "," + p1.y + ")rotate(" + angle + ")";
    //     }
    //     }
    // }

    function updateAircrafts(svg, path, projection, tails, flights) {
        // TODO дублируется с ininAircrafts
        console.log('updateAircrafts')
        const lineNodes = svg.selectAll('.routes').selectAll('.routes__lines').selectAll('path').nodes()
        const aircraftsOnAir = lineNodes.map(line => {
            const id = +line.getAttribute('id')
            const flight = flights.find(value => value.id = id)
            const totalLenght = line.getTotalLength()
            const aircraftPosition = line.getPointAtLength(flight.progress / 100 * totalLenght)
            const nextPosition = line.getPointAtLength(flight.progress + 1 / 100 * totalLenght)
            const angle = Math.atan2(aircraftPosition.y - nextPosition.y, aircraftPosition.x - nextPosition.x) * 180 / Math.PI;
            return { angle, id: flight.tailId, coordinates: [aircraftPosition.x, aircraftPosition.y] }
        })

        // TODO зарефакторить этот момент
        const aircrafts = tails.map(tail => {
            const tailOnAir = aircraftsOnAir.find(tailOnAir => tailOnAir.id === tail.id) 
            // TODO onFlight в селектор
            return tailOnAir ? {...tailOnAir, coordinates: tailOnAir.coordinates, onFlight: true } : 
                { ...tail, coordinates: projection(tail.coordinates), onFlight: false }
        })

        // svg.select('.routes__aircraft')
        //     .selectAll('circle')
        //     .data(aircrafts)
        //     .attr('r', '6px')
        //     .attr('fill', 'red')   
        //     .attr('stroke', 'black')
        //     .transition()
        //     .duration(1000) 
        //     .ease(d3.easeLinear)
        //     .attr('cx', (d) => d.coordinates[0] )
        //     .attr('cy', (d) => d.coordinates[1])

        svg.select('.routes__aircraft')
           .selectAll('image')
           .data(aircrafts)
           .transition()
           .duration(1000) 
           .ease(d3.easeLinear)
           .attr('x', d => d.coordinates[0] - 10)
           .attr('y', d => d.coordinates[1] - 10)
           .attr('transform', d => `rotate(${d.angle ? d.angle : -90} ${d.coordinates[0]} ${d.coordinates[1]})`)
            
    }

  function getFlightLine(flight) {
    return (flight.from && flight.to) ?
        {type: 'LineString', 'id': flight.id,
         'coordinates': [[flight.from.longt, flight.from.latt], 
         [flight.to.longt, flight.to.latt]], 'new': flight.mapAction = 'add_flight'} : {}
  }


export default MapView
