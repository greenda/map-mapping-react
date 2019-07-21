import React from 'react'
import { number } from 'prop-types'
import './ProgressBar.scss'

export function ProgressBar({progress}) {
    return (
    <div className="progressbar__container">
        <div style={{ left: -1 * (100 - progress) + '%', transition: 'left 1000ms ease-in'  }} className="progressbar__bar"></div>
    </div>)
}

ProgressBar.propTypes = {
    progress: number,
}

export default ProgressBar