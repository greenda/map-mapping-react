export function getCellProperties(cellWidthScale, timelineOffsetHours, currentTime, startDate, endDate) {
    const leftOffset = cellWidthScale * (startDate.diff(currentTime, 'hours') + timelineOffsetHours)
    const cellWidth = cellWidthScale * endDate.diff(startDate, 'hours')

    return { leftOffset, cellWidth}
}