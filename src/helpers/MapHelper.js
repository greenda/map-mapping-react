import * as d3 from 'd3'

export function translateAlong(path) {
    var pathLength = path.getTotalLength();
    return (_) => {
        return (t) => {
            var currentPoint = path.getPointAtLength(t * pathLength);
            var prevPoint = path.getPointAtLength(((t < 0.9 ? t : 0.9) - 0.1) * pathLength);
            const angle = Math.atan2(currentPoint.y - prevPoint.y, currentPoint.x - prevPoint.x) * 180 / Math.PI;
            
            return `rotate(${angle} ${currentPoint.x} ${currentPoint.y}) 
                translate(${currentPoint.x - 15}, ${currentPoint.y - 15})`;
        };
    };
}

export function translateAlongRoute(path) {
    return (_) => {
        return (t) => {
            const { currentPoint, prevPoint, angle } = getPointsAndAngle(t, path)
            
            return (t === 0) ? `rotate(${angle} ${prevPoint.x} ${prevPoint.y}) 
                    translate(${prevPoint.x - 15}, ${prevPoint.y - 15})` :
                `rotate(${angle} ${currentPoint.x} ${currentPoint.y}) 
                    translate(${currentPoint.x - 15}, ${currentPoint.y - 15})`;
        };
    };
}

export function getPointsAndAngle(t, path) {
    const pathLength = path.getTotalLength();
    let currentPoint
    let prevPoint
    let angle

    if (t === 0) {
        currentPoint = path.getPointAtLength((t + 1) * pathLength)
        prevPoint = path.getPointAtLength(t * pathLength)
        angle = Math.atan2(currentPoint.y - prevPoint.y, currentPoint.x - prevPoint.x) * 180 / Math.PI;
    } else {
        currentPoint = path.getPointAtLength(t * pathLength)
        prevPoint = path.getPointAtLength(((t < 0.9 ? t : 0.9) - 0.1) * pathLength)
        angle = Math.atan2(currentPoint.y - prevPoint.y, currentPoint.x - prevPoint.x) * 180 / Math.PI;
    }
    
    return { currentPoint, prevPoint, angle }
}

export function getPointsOnFlight(flightLine, flight) {
    const pathLength = flightLine.getTotalLength()

    const currentPosition = flightLine.getPointAtLength(flight.progress / 100 * pathLength)
    const prevPosition = flightLine.getPointAtLength(flight.prevProgress / 100 * pathLength)
    const nextPosition = flightLine.getPointAtLength(flight.progress + 1 / 100 * pathLength)
    const endPosition = flightLine.getPointAtLength(pathLength)

    const angle = Math.atan2(
        currentPosition.y - nextPosition.y, 
        currentPosition.x - nextPosition.x) * 180 / Math.PI;

    return { currentPosition, prevPosition, nextPosition, endPosition, angle }
}


export function processAircraftPoint(currentPath, aircraft, aircraftImage) {
    if (!currentPath.empty()) {
        if ((aircraft.progress === 0 && aircraft.prevProgress === 0)) {
            const { prevPoint, angle } = getPointsAndAngle(0, currentPath.node())                    
            d3.select(aircraftImage)
              .attr('transform', `rotate(${angle} ${prevPoint.x} ${prevPoint.y}) 
                        translate(${prevPoint.x - 15}, ${prevPoint.y - 15})`)
        } else if (aircraft.progress === 100) {
            d3.select(aircraftImage)
              .transition()
              .duration(1000)
              .ease(d3.easeLinear)
              .attrTween('transform', currentPath ? translateAlongRoute(currentPath.node()) : null)
        } else {
            d3.select(aircraftImage)
              .transition()
              .duration(1000)
              .ease(d3.easeLinear)
              .attrTween('transform', currentPath ? translateAlongRoute(currentPath.node()) : null)
        }
    } else {
        d3.select(aircraftImage)
          .attr('x', 0)
          .attr('y', 0)
          .attr('transform', d => `rotate(${-90} ${d.coordinates[0]} ${d.coordinates[1]}) 
            translate(${d.coordinates[0] - 15}, ${d.coordinates[1] - 15})`)
    }
}
