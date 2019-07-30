export function getCellProperties(cellWidthScale, timelineOffsetHours, currentTime, startDate, endDate) {
    const leftOffset = cellWidthScale * (startDate.diff(currentTime, 'hours') + timelineOffsetHours)
    const cellWidth = cellWidthScale * endDate.diff(startDate, 'hours')

    return { leftOffset, cellWidth}
}

export function getOrderSchaduleRows(orders) {
    const rows = [[]]
    orders.forEach(order => {
        const freeRow = rows.find(row => 
                (row.length === 0) || !row.find(b => isIntersect(b, order)))
        if (freeRow) {
            freeRow.push(order)
        } else {
            rows.push([order])
        }
    })
    return rows

}
function isIntersect(firstOrder, secondOrder) {
    return firstOrder.dateTakeOff.isSame(secondOrder.dateTakeOff) ||
        firstOrder.dateLanding.isSame(secondOrder.dateTakeOff) ||
        firstOrder.dateTakeOff.isAfter(secondOrder.dateTakeOff) ||
        firstOrder.dateTakeOff.isAfter(secondOrder.dateLanding) ||
        firstOrder.dateLanding.isAfter(secondOrder.dateLanding) ||
        firstOrder.dateLanding.isAfter(secondOrder.dateTakeOff) ||
        (firstOrder.dateTakeOff.isAfter(secondOrder.dateTakeOff) &&
         firstOrder.dateLanding.isBefore(secondOrder.dateLanding))
}