// TODO в отдельный редьюсер
// const countries = {
//     1: {
//         name: 'Алжир'
//     },
//     2: {
//         name: 'Индия'
//     },
//     3: {
//         name: 'ЮАР'
//     },
//      4: {
//          name: 'Западная Сахара'
//      },
//      5: {
//          name: 'Бразилия'
//      },
//      6: {
//          name: 'Канада'   
//      },
//      7: {
//          name: 'США'   
//      },
//      8: {
//          name: 'Россия'   
//      },
//      9: {
//          name: 'Австралия'   
//      },
// }

const initialState = {
    items: {
        1: {
            id: 1,
            name: 'Хуари Бумедьен',
            iata: 'ALG',
            countriesId: 1,
            latt: 36.69,
            longt: 3.22,
        },
        2: {
            id: 2,
            name: 'Агра Херия',
            iata: 'AGR',
            countriesId: 2,
            latt: 27.15,
            longt: 77.96,
        },
        3: {
            id: 3,
            name: 'Кейптаун',
            iata: 'CPT',
            countriesId: 3,
            latt: -33.96,
            longt: 18.6,
        },
        4: {
            id: 4,
            name: 'Дахла',
            iata: 'VIL',
            countriesId: 4,
            latt: 23.68,
            longt: -15.95,
        },
        5: {
            id: 5,
            name: 'Бразилиа',
            iata: 'BSB',
            countriesId: 5,
            latt: -15.86,
            longt: -47.92,
        },
        6: {
            id: 6,
            name: 'Торонто Пирсон',
            iata: 'YYZ',
            countriesId: 6,
            latt: 43.67,
            longt: -79.63,
        },
        7: {
            id: 7,
            name: 'Кадьяк',
            iata: 'ADQ',
            countriesId: 7,
            latt: 57.79,
            longt: -152.40,
        },
        8: {
            id: 8,
            name: 'Новый',
            iata: 'KHV',
            countriesId: 8,
            latt: 48.53,
            longt: 135.19,
        },
        9: {
            id: 9,
            name: 'Перт',
            iata: 'PER',
            countriesId: 9,
            latt: -31.94,
            longt: 115.97,
        },
        10: {
            id: 10,
            name: 'Уфа',
            iata: 'UFA',
            countriesId: 8,
            latt: 54.56,
            longt: 55.87,
        }
    }
}

export function airportsReducer(state = initialState) {
    return state
}