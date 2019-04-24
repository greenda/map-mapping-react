import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'
import { PropTypes } from 'prop-types'

export function MapView({flights}) {
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(() => {
        d3.json('world_countries.json')
        .then((countries) => {
          showMapBackground(countries, flights)
          setIsLoaded(true)
        })
        .catch(error => console.log(error))
    }, [])
    useEffect(() => {
        if (isLoaded) {
            // TODO хранить svg в хуках
            const svg = d3.select('#mapa')

            const line2 = svg.select('.line2').node()
            // TODO в функцию
            const lineLenght = line2.getTotalLength()
            const aircraft = line2.getPointAtLength(Math.floor(flights[0].progress) / 100 * lineLenght)
            svg.select('.aircraft').select('circle')
                .attr('cx', () => aircraft.x )
                .attr('cy', () => aircraft.y)
        }
    }, [flights])

    return (
        <div>
            <svg id="mapa" className="map__container"></svg>
        </div>
    )
}

MapView.propTypes = {
    flights: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        tail: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string}),
        fromIata: PropTypes.string,
        toIata: PropTypes.string,
        dateTakeOff: PropTypes.object,
        dateLanding: PropTypes.object,
        status: PropTypes.string,
    }))
}

function showMapBackground(data) {
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

// TODO для вращения символа
// function translateAlong(path) {
//     var l = path.getTotalLength();
//     return function(d, i, a) {
//       return function(t) {
//         atLength = direction === 1 ? (t * l) : (l - (t * l));
//         var p1 = path.getPointAtLength(atLength),
//             p2 = path.getPointAtLength((atLength)+direction),
//             angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
//         label.text(Math.round(angle) + "°");
//         return "translate(" + p1.x + "," + p1.y + ")rotate(" + angle + ")";
//       }
//     }
//   }

export default MapView