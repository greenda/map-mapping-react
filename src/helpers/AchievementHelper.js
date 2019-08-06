export function getAchievementList(currentAchievementIds, licencesIds,
    currentLicenceIds, currentBudget, stockingFlightCounts,
    tails, achievements, budgetAchievementLimit, 
    stockingAchievementLimit, tailAchievementLimit) {
    const achievementIdsList = []

    if (licencesIds.length === currentLicenceIds.length &&
        !currentAchievementIds.includes(0)) {
        achievementIdsList.push(0)
    }

    if (currentBudget >= budgetAchievementLimit &&
        !currentAchievementIds.includes(1)) {
        achievementIdsList.push(1)
    }

    if (stockingFlightCounts === stockingAchievementLimit &&
        !currentAchievementIds.includes(2)) {            
        achievementIdsList.push(2)
    }

    if (tails.length === tailAchievementLimit &&
        !currentAchievementIds.includes(3)) {
        achievementIdsList.push(3)
    }

    if (achievements.length === currentAchievementIds.length + 1 &&
        !currentAchievementIds.includes(4)) {
        achievementIdsList.push(4)
    }

    return achievementIdsList
}