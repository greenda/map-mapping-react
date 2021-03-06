import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes, { number, string } from 'prop-types'
import Modal from '@material-ui/core/Modal'
import moment from 'moment'
import {
    achievementsSelector, currentAchievementIdsSelector,
    licenceIdsSelector, currentLicenceIdsSelector,
    maxTimeSelector, currentBudgetSelector,
    stockingFlightCountsSelector, tailsSelector,
} from '../../../selectors/index'
import { addAchievement } from '../../../actions/pageActions'
import CongratulationView from './CongratulationView'
import { getAchievementList } from '../../../helpers/AchievementHelper'
import { 
    BUDGET_ACHIEVEMENT_LIMIT, 
    STOCKING_ACHIEVEMENT_LIMIT, 
    TAIL_ACHIEVEMENT_LIMIT 
} from '../../../constants/achievements'

import './CongratulationContainer.scss'

export function CongratulationContainer({ achievements, currentAchievementIds,
    maxTime, licencesIds, currentLicenceIds, currentBudget, stockingFlightCounts, tails, addAchievement }) {
    const [isOpen, setIsOpen] = useState(false)
    const [achievementQueue, setAchievementQueue] = useState([])
    const [achievementToShow, setAchievementToShow] = useState()
    const onContainerClick = () => {
        setIsOpen(!isOpen)
    }
    useEffect(() => {
        const achievementIdsList = getAchievementList(currentAchievementIds, licencesIds,
            currentLicenceIds, currentBudget, stockingFlightCounts,
            tails, achievements, BUDGET_ACHIEVEMENT_LIMIT, 
            STOCKING_ACHIEVEMENT_LIMIT, TAIL_ACHIEVEMENT_LIMIT )

        if (achievementIdsList.length > 0) {
            if (achievementQueue.length === 0) {
                const newAchievement = achievements[achievementIdsList[0]]
                setAchievementToShow(newAchievement)
                setAchievementQueue(achievementIdsList.slice(1))
                addAchievement(newAchievement.id)

                setTimeout(() => {
                    setIsOpen(true)
                }, 0)
            } else {
                setAchievementQueue([...achievementQueue, achievementIdsList])
            }
        }

    }, [maxTime, tails, currentLicenceIds, stockingFlightCounts, currentBudget])

    const handleClose = () => {
        if (achievementQueue.length > 0) {
            setAchievementToShow(achievements[achievementQueue[0]])
            setIsOpen(true)
            setAchievementQueue(achievementQueue.slice(1))
        }
    }

    return (
        <div className="congratulation__container"
            onClick={onContainerClick}>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                onClose={handleClose}
                open={isOpen}>
                <div className="modal-container">
                    <CongratulationView achievement={achievementToShow} />
                </div>
            </Modal>
        </div>
    )
}

CongratulationContainer.propTypes = {
    achievements: PropTypes.arrayOf(PropTypes.shape({
        id: number,
        title: string,
        imageKey: string,
        description: string,
        congratulation: string,
    })),
    currentAchievementIds: PropTypes.arrayOf(number),
    maxTime: PropTypes.instanceOf(moment),
    licencesIds: PropTypes.arrayOf(number),
    currentLicenceIds: PropTypes.arrayOf(number),
    currentBudget: number,
    stockingFlightCounts: number,
    tails: PropTypes.arrayOf(PropTypes.shape({
        id: number,
        name: string, 
        airportId: number,
        progress: number,
    })),
    addAchievement: PropTypes.func,
}

export default connect((state) => ({
    achievements: achievementsSelector(state),
    currentAchievementIds: currentAchievementIdsSelector(state),
    licencesIds: licenceIdsSelector(state),
    currentLicenceIds: currentLicenceIdsSelector(state),
    maxTime: maxTimeSelector(state),
    currentBudget: currentBudgetSelector(state),
    stockingFlightCounts: stockingFlightCountsSelector(state),
    tails: tailsSelector(state),
}), { addAchievement })(CongratulationContainer)
