import React, { useEffect, useState } from 'react'
import PropTypes, { number, string } from 'prop-types'
import moment from 'moment'
import * as d3 from 'd3'
import './MapView.scss'
import { processAircraftPoint, getPointsOnFlight } from '../../helpers/MapHelper'
import { flightDateSortPredicat } from '../../helpers/FlightHelper'
import aircraftIconRed from '../../assets/aircraft-icon__red.svg'
import aircraftIconGray from '../../assets/aircraft-icon__gray.svg'
const width = 1100
const height = 550

const ACTIVE_COUNTRY_COLOR = 'white'
const ACTIVE_COUNTRY_BORDER = 'gray'
const ACTIVE_AIRPORT_FILL = '#dfc16d'
const INACTIVE_COUNTTRY_BORDER = '#9bacac'
const INACTIVE_COUNTRY_COLOR = '#9bacac'
const INACTIVE_AIRPORT_FILL = '#9bacac'

const CURRENT_PATH_PREFIX = 'current-path-'
const PATH_PREFIX = 'path-'

export function MapView({ flights, orders, tails, airports,
    regionIds, countries, onOrderClick, isShowPlaned }) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [svg, setSvg] = useState()

    const projection = d3.geoEquirectangular()
        .scale(180)
        .translate([width / 2, height / 2])
    const path = d3.geoPath().projection(projection)
    const licencedAirports = airports.filter(airport => regionIds.includes(airport.regionId))

    useEffect(() => {
        if (countries && !isLoaded) {
            init(path, countries, regionIds, projection, licencedAirports,
                flights, orders, tails, setIsLoaded, setSvg, onOrderClick, isShowPlaned)
        }
    }, [countries])
    useEffect(() => {
        if (isLoaded) {
            updateRoutes(svg, path, flights, orders, onOrderClick, isShowPlaned)
            updateAircrafts(svg, path, projection, tails, flights)
        }
    }, [flights])

    return (<>
        <div className={`map__loader ${!isLoaded ? 'loading' : 'loaded'}`}>...</div>
        <svg id="mapa" className={`map__container ${!isLoaded ? 'loading' : 'loaded'}`}></svg>
    </>
    )
}

function showMapBackground(svg, path, data, regionIds) {
    svg.append('g')
        .attr('class', 'countries')
        .selectAll('path')
        .data(data.features)
        .enter()
        .append('path')
        .attr('d', path)
        .style('stroke', d => regionIds.includes(d.properties.regionId) ?
            ACTIVE_COUNTRY_BORDER : INACTIVE_COUNTTRY_BORDER)
        .style('stroke-width', 0.5)
        .style('fill', d => regionIds.includes(d.properties.regionId) ?
            ACTIVE_COUNTRY_COLOR : INACTIVE_COUNTRY_COLOR)
}

function init(path, countries, regionIds, projection, licencedAirports,
    flights, orders, tails, setIsLoaded, setSvg, onOrderClick, isShowPlaned) {
    const svg = d3.select('#mapa')
        .attr('width', width)
        .attr('height', height)
    showMapBackground(svg, path, countries, regionIds)
    updateRoutes(svg, path, flights, orders, onOrderClick, isShowPlaned)
    initAirports(svg, projection, licencedAirports, regionIds)
    initAircraft(svg, projection, tails, flights)
    setIsLoaded(true)
    setSvg(svg)
}

function updateRoutes(svg, path, flights, orders, onOrderClick, isShowPlaned) {
    const currentFlights = flights.filter(value => 0 <= value.progress && value.progress <= 100)
    const lines = currentFlights.map(flight => getFlightLine(flight))

    if (svg.select('.routes').empty()) {
        svg.append('g')
            .attr('class', 'routes')
    } else {
        svg.select('.routes').select('.routes__lines').remove()
        svg.select('.routes__paths').remove()
        svg.select('.routes').select('.orders__lines').remove()
        svg.select('.routes').select('.routes__airports').remove()
    }

    svg.select('.routes')
        .append('g')
        .attr('class', 'routes__lines')
        .selectAll('path')
        .data(lines)
        .enter()
        .append('path')
        .attr('id', d => `${PATH_PREFIX}${d.id}`)
        .attr('class', 'line')
        .attr('d', path)
        .attr('fill', 'none')
        .attr('stroke', 'black')

    svg.select('.routes__lines')
        .selectAll('path')
        .nodes()
        .forEach((path) => {
            const length = path.getTotalLength()
            d3.select(path)
                .attr('stroke-dasharray', length)
                .attr('stroke-dashoffset', d => d.new ? length : 0)
                .transition()
                .duration(1000)
                .attr('stroke-dashoffset', 0)
        })

    if (isShowPlaned) {
        showPlanedFlights(svg, path, orders, onOrderClick)
    }
}

function initAirports(svg, projection, airports, regionIds) {
    svg.append('g')
        .attr('class', 'routes__airports')
        .selectAll('circle')
        .data(airports)
        .enter()
        .append('circle')
        .attr('cx', d => projection([d.longt, d.latt])[0])
        .attr('cy', d => projection([d.logt, d.latt])[1])
        .attr('r', '6px')
        .attr('fill', d => regionIds.includes(d.regionId) ?
            ACTIVE_AIRPORT_FILL : INACTIVE_AIRPORT_FILL)
        .attr('stroke', 'black')

    svg.select('.routes__airports')
        .selectAll('text')
        .data(Object.values(airports))
        .enter()
        .append('text')
        .attr('x', d => projection([d.longt, d.latt])[0] + 1)
        .attr('y', d => projection([d.longt, d.latt])[1] + 25)
        .attr('text-anchor', 'middle')
        .style('fill', 'black')
        .style('font-size', '14px')
        .text(d => d.iata)
}

function initAircraft(svg, projection, tails, flights) {
    const aircrafts = getAircraftsDetails(svg, projection, flights, tails)

    svg.append('g')
        .attr('class', 'routes__aircraft')
        .selectAll('image')
        .data(aircrafts)
        .enter()
        .append('image')
        .attr('id', d => d.id)
        .attr('xlink:href', d => d.onFlight ? aircraftIconRed : aircraftIconGray)
        .attr('width', 30)
        .attr('height', 30)
        .attr('x', 0)
        .attr('y', 0)
        .attr('transform', d => `rotate(${d.angle}, ${d.coordinates[0]}, ${d.coordinates[1]})
            translate(${d.coordinates[0] - 15}, ${d.coordinates[1] - 15})`)
        
    svg.select('.routes__aircraft')
        .selectAll('text')
        .data(aircrafts)
        .enter()
        .append('text')
        .attr('x', d => d.coordinates[0])
        .attr('y', d => d.coordinates[1] - 25)
        .attr('text-anchor', 'middle')
        .style('fill', 'black')
        .text(d => d.name)
}

function updateAircrafts(svg, path, projection, tails, flights) {
    const aircrafts = getAircraftsDetails(svg, projection, flights, tails)

    svg.append('g')
       .attr('class', 'routes__paths')
       .selectAll('path')
       .data(aircrafts
            .filter(aircraft => aircraft.currentPathObject)
            .map(aircraft => aircraft.currentPathObject))
       .enter()
       .append('path')
       .attr('id', d => `${CURRENT_PATH_PREFIX}${d.id}`)
       .attr('d', path)
       .attr('fill', 'none')

    svg.select('.routes__aircraft')
       .selectAll('image')
       .data(aircrafts)
       .attr('xlink:href', d => d.onFlight ? aircraftIconRed : aircraftIconGray)
       .nodes()
       .forEach((aircraftImage) => {
            const id = +aircraftImage.id
            const aircraft = aircrafts.find(aircraft => aircraft.id === +aircraftImage.id)
            
            const currentPath = svg.select('.routes__paths').select(`#${CURRENT_PATH_PREFIX}${id}`)
            processAircraftPoint(currentPath, aircraft, aircraftImage)            
        })

    svg.select('.routes__aircraft')
        .selectAll('text')
        .data(aircrafts)
        .transition()
        .duration(d => d.onFlight && d.onFlight && !d.changeState ? 1000 : 0)
        .ease(d3.easeLinear)
        .attr('x', d => d.coordinates[0])
        .attr('y', d => d.coordinates[1] - 25)
        .attr('text-anchor', 'middle')
        .style('fill', 'black')
        .text(d => d.name)
}

function getFlightLine(flight) {
    return (flight.from && flight.to) ? {
        type: 'LineString', 'id': flight.id,
            'coordinates': [[flight.from.longt, flight.from.latt],
                [flight.to.longt, flight.to.latt]], 'new': flight.mapAction === 'add_flight'
    } : {}
}

function showPlanedFlights(svg, path, orders, onOrderClick) {
    const orderLines = orders.map(order => getFlightLine(order))
        svg.select('.routes')
            .append('g')
            .attr('class', 'orders__lines')
            .selectAll('path')
            .data(orderLines)
            .enter()
            .append('path')
            .attr('id', d => `order ${d.id}`)
            .attr('class', 'order-line')
            .attr('d', path)
            .attr('fill', 'none')
            .attr('stroke', 'slategrey')
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', 10)
            .style('cursor', 'pointer')
            .on('click', d => onOrderClick(d.id))
}

function getInvertSVGPointCoordinate(projection, point) {
    return projection.invert([point.x, point.y])
}

function getAircraftsDetails(svg, projection, flights, tails) {
    const sortedFlights = [...flights]
        .filter(flight => flight.progress !== 101)
        .sort(flightDateSortPredicat)
    return tails.map(tail => {        
        const linkedFlights = sortedFlights.filter(flight => flight.tailId === tail.id)
        const linkedFlight = (linkedFlights && linkedFlights.length > 0) ? linkedFlights[0] : null
        if (linkedFlights && linkedFlights.length > 0 && 
            linkedFlight.progress > -1 && linkedFlight.progress < 101) {
            const linkedPath = 
                svg.selectAll('.routes')
                .selectAll('.routes__lines')
                .select(`#${PATH_PREFIX}${linkedFlight.id}`)
                .node()

            const { currentPosition, prevPosition, endPosition, angle } = 
                getPointsOnFlight(linkedPath, linkedFlight)
            const changeState = (linkedFlight.progress === 100 || linkedFlight.progress === 0)
            const currentPathCoordinates = linkedFlight.progress === 0 ? [
                getInvertSVGPointCoordinate(projection, prevPosition),
                getInvertSVGPointCoordinate(projection, endPosition)
            ] : [
                getInvertSVGPointCoordinate(projection, prevPosition),
                getInvertSVGPointCoordinate(projection, currentPosition)
            ]
            
            const currentPathObject = { type: 'LineString', 'id': linkedFlight.tail.id, 'coordinates': currentPathCoordinates}

            return {
                changeState,
                currentPathObject,
                angle,
                id: linkedFlight.tailId,
                name: linkedFlight.tail.name,
                progress: linkedFlight.progress,
                prevProgress: linkedFlight.prevProgress,
                coordinates: [currentPosition.x, currentPosition.y],
                onFlight: true
            }
        }

        return {
            ...tail, 
            coordinates: projection(tail.coordinates),
            onFlight: false,
            angle: -90, 
            changeState: true,
            name: tail.name,
        }
    })
}

MapView.propTypes = {
    flights: PropTypes.arrayOf(PropTypes.shape({ 
        id: number, 
        name: string,
        tailId: number,
        from: PropTypes.object,
        to: PropTypes.object,
        fromIata: PropTypes.string,
        toIata: PropTypes.string,
        dateTakeOff: PropTypes.object,
        dateLanding: PropTypes.object,
        status: string,
        linkedFlightId: number,
    })),
    orders: PropTypes.arrayOf(PropTypes.shape({
        id: number,
        name: string,
        fromId: number,
        toId: number,
        dateTakeOff: PropTypes.instanceOf(moment),
        dateLanding: PropTypes.instanceOf(moment),
        status: string,
        progress: number,
        orderId: number,
        pay: number,
        cost: number,
        description: string,
    })),
    tails: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            airportId: PropTypes.number,
        })
    ),
    airports: PropTypes.arrayOf(
        PropTypes.shape({ 
            id: number,
            name: string,
            iata: string,
            countriesId: number,
            latt: number,
            longt: number,
            costOnHour: number,
        })
    ),
    regionIds: PropTypes.arrayOf(number),
    countries: PropTypes.object,
    onOrderClick: PropTypes.func,
    isShowPlaned: PropTypes.bool,
}

export default MapView
