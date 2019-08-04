import React from 'react'
import PropTypes, { number, string } from 'prop-types'
import achievement_empty from '../../../assets/achievement_empty.svg'
import './AchievementItem.scss'

export function AchievementItem({ achievement, currentAchievementIds, images }) {
    const isOpen = currentAchievementIds.includes(achievement.id)
    return (
        <div className={`achievement-item ${isOpen ? 'open' : ''}`}>
            <img src={isOpen ? images[achievement.imageKey] : achievement_empty} alt="achievement icon" />
            <div className="achievement-item__description-container">
                <span>{achievement.title}</span>
                <span className={`${isOpen ? 'hidden' : ''}`}>{achievement.description}</span>
                <span className={`${!isOpen ? 'hidden' : ''}`}>{achievement.congratulation}</span>         
            </div>            
        </div>
    )
}

AchievementItem.propTypes = {
    achievement: PropTypes.shape({
        id: number,
        title: string,
        imageKey: string,
        description: string,
        congratulation: string,
    }),
    currentAchievementIds: PropTypes.arrayOf(number),
    images: PropTypes.arrayOf(string),
}

export default AchievementItem