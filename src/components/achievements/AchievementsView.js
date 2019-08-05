import React from 'react'
import AchievementItem from './achievement/AchievementItem'
import PropTypes, { number, string } from 'prop-types'
import './AchievementsView.scss'

export function AcheivementsView({ achievements, images, currentAchievementIds }) {
    return (
        <div className="achievements__container">
            {achievements.map(achievement => (
                <AchievementItem
                    key={achievement.id}
                    images={images}
                    currentAchievementIds={currentAchievementIds}
                    achievement={achievement}/>
            ))}
        </div>
    )
}

AcheivementsView.propTypes = {
    achievement: PropTypes.shape({
        id: number,
        title: string,
        imageKey: string,
        description: string,
        congratulation: string,
    }),
    currentAchievementIds: PropTypes.arrayOf(number),
    images: PropTypes.object,
}

export default AcheivementsView