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