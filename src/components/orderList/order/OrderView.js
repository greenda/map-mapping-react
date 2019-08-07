import React from 'react'
import PropTypes, { number, string } from 'prop-types'
import moment from 'moment'
import useToggler from '../../../common/custom-hooks/toogle-open'
import './OrderView.scss'


export function OrderView({ order }) {
    const { name, from, to, progress, dateTakeOff, dateLanding, pay, cost } = order
    const { expanded, toggleExpanded } = useToggler(false)
    
    return (
        <div className={`order__container ${progress > 100 ? 'ended' : ''}`}>
            <div className="order__header">
                <div className="order__header__row">
                    <div className="order__name">{name}</div>
                    <div className="order__expand-button" 
                        onClick={toggleExpanded}>{expanded ? '-' : '+'}</div>
                </div>
                <div className="order__header__row left">
                    <div>{from.iata} - {to.iata}</div>
                </div>
                <div className="order__header__row left">
                    <div>cost: {cost}, pay: {pay}</div>
                </div>
                <div className="small-font">
                    <div>{`${dateTakeOff.format('DD.MM HH:mm')} - 
                           ${dateLanding.format('DD.MM HH:mm')}`}</div>
                </div>                
            </div>            
            {getDetails(expanded, order)}
        </div>
    )
}

function getDetails(expanded, order) {
    return (expanded && order.description) ? 
        (<div className="order__description">{order.description}</div>) : (<div></div>)
}

OrderView.propTypes = {
    order: PropTypes.shape({
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
    }),
}

export default OrderView
