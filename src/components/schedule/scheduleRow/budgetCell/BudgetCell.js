import React from 'react'
import PropTypes, { number, string, object } from 'prop-types'
import moment from 'moment'
import { getCellProperties } from '../../../../helpers/ScheduleHelper'
import './BudgetCell.scss'

export function BudgetCell({
    chainElement, cellWidthScale,
    timelineOffsetHours, currentTime }) {
    const { leftOffset, cellWidth } = 
        getCellProperties(cellWidthScale, timelineOffsetHours, currentTime, chainElement.startDate, chainElement.endDate) 
    return (
        <div className="chain-budget-cell"
                style={{left: leftOffset, width: cellWidth}}>{chainElement.saldo} ☼</div>
    ) 
}

BudgetCell.prototype = {
    budgetChain: PropTypes.arrayOf(
        PropTypes.shape({
            ids: PropTypes.arrayOf(number),
            tailId: number,
        })
    ),
    flights: PropTypes.arrayOf(PropTypes.shape({
        id: number, 
        name: string,
        tailId: number,
        from: object,
        to: object,
        fromIata: string,
        toIata: string,
        dateTakeOff: object,
        dateLanding: object,
        status: string
    })),
    cellWidthScale: number,
    currentTime: PropTypes.instanceOf(moment),
    timelineOffsetHours: number,
}

export default BudgetCell