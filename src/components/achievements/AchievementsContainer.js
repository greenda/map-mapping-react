import React from 'react'
import { connect } from 'react-redux'
import PropTypes, { number, string } from 'prop-types'
import { achievementsSelector, currentAchievementIdsSelector } from '../../selectors/index'
import AchievementsView from './AchievementsView'
import achievementMagelan from '../../assets/achievement_Magelan.svg'
import achievementAviaCroesus from '../../assets/achievement_avia_Croesus.svg'
import achievementOurHero from '../../assets/achievement_our_hero.svg'
import achievementGreatArmator from '../../assets/achievement_great_armator.svg'
import achievement_achievment_hunter from '../../assets/achievement_achievment_hunter.svg'

export function AchievementsContainer({ achievements, currentAchievementIds }) {
    const images = {
        achievementMagelan, achievementAviaCroesus, achievementOurHero,
        achievementGreatArmator, achievement_achievment_hunter,
     }
     
    return (
        <AchievementsView
            achievements={achievements}
            currentAchievementIds={currentAchievementIds}
            images={images}/>
    )
}

AchievementsContainer.propTypes = {
    achievements: PropTypes.arrayOf(PropTypes.shape({
        id: number,
        title: string,
        imageKey: string,
        description: string,
        congratulation: string,
    })),
    currentAchievementIds: PropTypes.arrayOf(number),
}

export default connect((state) => ({
    achievements: achievementsSelector(state),
    currentAchievementIds: currentAchievementIdsSelector(state),
}))(AchievementsContainer)