import { pageActionTypes } from '../constants/action-types'

const initialState = {
    all: [
        {
            id: 0,
            title: 'Магелан за штурвалом',
            imageKey: 'achievementMagelan',
            description: 'Пройти все круги бюрократического ада и получи лицензии для пролета по всему миру',
            congratulation: `И... последняя печать. Твои борта кочуют по свету как беззаботные птицы, 
                а конкуренты кусают локти в очередях перед кабинетами чиновников. 
                Поздравляем! Мир теперь твой!`,
        },
        {
            id: 1,
            title: 'АвиаКрез',
            imageKey: 'achievementAviaCroesus',
            description: 'Бюджет компании перевалил за 1000 ☼',
            congratulation: `Все, к чему ты прикасаешься, обращается в золото,
                заказчики при виде тебя бросают в воздух монетки, 
                обшивка твоих бортов стала подозрительно блестеть. 
                Поздравляем! Девочки на Мальдивах поднимают в твою честь бокалы!`,
        },
        {
            id: 2,
            title: 'Наш герой!',
            imageKey: 'achievementOurHero',
            description: 'Выполнить 5 заказов на доставку чулок',
            congratulation: `Каждая ножка укутана в шелк, жажда прекрасного 
                утолена и красота, наконец спасла мир. И все благодаря тебе! Виват!`
        },
        {
            id: 3,
            title: 'Великий арматор',
            imageKey: 'achievementGreatArmator',
            description: 'Собрать флот из 10 бортов',
            congratulation: `Закрывая глаза перед сном авиадиспетчеры видят ливреи твоих бортов.
                Дети, подняв голову вверх на рев мотора безошибочно называют твою компанию.
                Поистине, твоя армада владеет небесами! `,
        },
        {
            id: 4,
            title: 'Охотник до ачивок',
            imageKey: 'achievement_achievment_hunter',
            description: 'Получить все ачивки',
            congratulation: `Когда фортуне хочется кого-нибудь одарить, 
                в первую очередь она вспоминает о тебе.
                Как еще объяснить, что ты собрал все ачивки? Это победа, брат!`
        },
    ],
    currentAchievemntIds: [],
}

export function achievementsReducer(state = initialState, action) {
    const { type, payload = {} } = action
    switch (type) {
        case pageActionTypes.ADD_ACHIEVEMENT:
            const { achievementId } = payload
            if (!state.currentAchievemntIds.includes(achievementId))
            return (state.currentAchievemntIds.includes(achievementId)) ? state : 
                { ...state, currentAchievemntIds: [...state.currentAchievemntIds, achievementId] }
            break
        default: return state
    }
}