// TODO переименова в geometry reducer, items в airports
import { pageActionTypes } from '../constants/action-types'

const initialState = {
    items: {
        1: {
            id: 1,
            name: 'Хуари Бумедьен',
            iata: 'ALG',
            countriesId: 1,
            latt: 36.69,
            longt: 3.22,
            costOnHour: 10,
            regionId: 2,
        },
        2: {
            id: 2,
            name: 'Агра Херия',
            iata: 'AGR',
            countriesId: 2,
            latt: 27.15,
            longt: 77.96,
            costOnHour: 20,
            regionId: 1,
        },
        3: {
            id: 3,
            name: 'Кейптаун',
            iata: 'CPT',
            countriesId: 3,
            latt: -33.96,
            longt: 18.6,
            costOnHour: 30,
            regionId: 2,
        },
        4: {
            id: 4,
            name: 'Дахла',
            iata: 'VIL',
            countriesId: 4,
            latt: 23.68,
            longt: -15.95,
            costOnHour: 20,
            regionId: 2,
        },
        5: {
            id: 5,
            name: 'Бразилиа',
            iata: 'BSB',
            countriesId: 5,
            latt: -15.86,
            longt: -47.92,
            costOnHour: 10,
            regionId: 4,
        },
        6: {
            id: 6,
            name: 'Торонто Пирсон',
            iata: 'YYZ',
            countriesId: 6,
            latt: 43.67,
            longt: -79.63,
            costOnHour: 20,
            regionId: 3,
        },
        7: {
            id: 7,
            name: 'Кадьяк',
            iata: 'ADQ',
            countriesId: 7,
            latt: 57.79,
            longt: -152.40,
            costOnHour: 30,
            regionId: 3,
        },
        8: {
            id: 8,
            name: 'Новый',
            iata: 'KHV',
            countriesId: 8,
            latt: 48.53,
            longt: 135.19,
            costOnHour: 10,
            regionId: 1,
        },
        9: {
            id: 9,
            name: 'Перт',
            iata: 'PER',
            countriesId: 9,
            latt: -31.94,
            longt: 115.97,
            costOnHour: 10,
            regionId: 5,
        },
        10: {
            id: 10,
            name: 'Уфа',
            iata: 'UFA',
            countriesId: 8,
            latt: 54.56,
            longt: 55.87,
            costOnHour: 20,
            regionId: 1,
        },
        11: {
            id: 11,
            name: 'Арланда',
            iata: 'ARN',
            countriesId: 10,
            latt: 59.65,
            longt: 7.92,
            costOnHour: 10,
            regionId: 1,
        },
        12: {
            id: 12,
            name: 'Портела',
            iata: 'LIS',
            countriesId: 11,
            latt: 38.77,
            longt: -9.12,
            costOnHour: 20,
            regionId: 1,
        },
        13: {
            id: 13,
            name: 'Имам Хомейни',
            iata: 'THR',
            countriesId: 12,
            latt: 35.40,
            longt: 51.15,
            costOnHour: 10,
            regionId: 1,
        },
        14: {
            id: 14,
            name: 'София',
            iata: 'SOF',
            countriesId: 13,
            latt: 42.68,
            longt: 23.42,
            costOnHour: 10,
            regionId: 1,
        },
        15: {
            id: 15,
            name: 'Риян Мукалла',
            iata: 'RIY',
            countriesId: 14,
            latt: 14.66,
            longt: 49.37,
            costOnHour: 40,
            regionId: 1,
        },
        16: {
            id: 16,
            name: 'Кунсан',
            iata: 'KUV',
            countriesId: 15,
            latt: 35.98,
            longt: 126.75,
            costOnHour: 10,
            regionId: 1,
        },
        17: {
            id: 17,
            name: 'Кун',
            iata: 'VCS',
            countriesId: 16,
            latt: 10.37,
            longt: 106.63,
            costOnHour: 10,
            regionId: 1,
        },
        // : {
        //     id: ,
        //     name: '',
        //     iata: '',
        //     countriesId: ,
        //     latt: ,
        //     longt: ,
        //     costOnHour: ,
        //     regionId: ,
        // },
    },
    distance: {
        1: {
            1: 0, 2: 6961, 3: 8019, 4: 2330, 5: 7921, 6: 6784, 7: 9274, 8: 9420, 9: 13948, 10: 4427
        },
        2: {
            1: 6961, 2: 0, 3: 9236, 4: 9190, 5: 14325, 6: 11817, 7: 9476, 8: 5408, 9: 7708, 10: 3536
        },
        3: {
            1: 8019, 2: 9236, 3: 0, 4: 7382, 5: 6888, 6: 13141, 7: 17292, 8: 14642, 9: 8692, 10: 10472
        },
        4: {
            1: 2330, 2: 9190, 3: 7382, 4: 0, 5: 5610, 6: 6136, 7: 10103, 8: 11486, 9: 15241, 10: 6721
        },
        5: {
            1: 7921, 2: 14325, 3: 6888, 4: 5610, 5: 0, 6: 7367, 7: 12360, 8: 16377, 9: 14432, 10: 12328
        },
        6: {
            1: 6784, 2: 11817, 3: 13141, 4: 6136, 5: 7367, 6: 0, 7: 5088, 8: 9216, 9: 18134, 10: 8311
        },
        7: {
            1: 9274, 2: 9476, 3: 17292, 4: 10103, 5: 12360, 6: 5088, 7: 0, 8: 4691, 9: 13053, 10: 7271
        },
        8: {
            1: 9420, 2: 5408, 3: 14642, 4: 11486, 5: 16377, 6: 9216, 7: 4691, 8: 0, 9: 9152, 10: 5230
        },
        9: {
            1: 13948, 2: 7708, 3: 8692, 4: 15241, 5: 14432, 6: 18134, 7: 13053, 8: 9152, 9: 0, 10: 11200
        },
        10: {
            1: 4427, 2: 3536, 3: 10472, 4: 6721, 5: 12328, 6: 8311, 7: 7271, 8: 5230, 9: 11200, 10: 0
        },
    },
    regions: {
        1: {
            id: 1,
            name: 'Eurasia'
        },
        2: {
            id: 2,
            name: 'Africa'
        },
        3: {
            id: 3,
            name: 'North America'
        },
        4: {
            id: 4,
            name: 'South America'
        },
        5: {
            id: 5,
            name: 'Australia and Oceania'
        },
        6: {
            id: 6,
            name: 'Antarсtica'
        }
    },
    countries: {
        1: {
            name: 'Алжир'
        },
        2: {
            name: 'Индия'
        },
        3: {
            name: 'ЮАР'
        },
        4: {
            name: 'Западная Сахара'
        },
        5: {
            name: 'Бразилия'
        },
        6: {
            name: 'Канада'   
        },
        7: {
            name: 'США'   
        },
        8: {
            name: 'Россия'   
        },
        9: {
            name: 'Австралия'   
        },
        10: {
            name: 'Швеция'
        },
        11: {
            name: 'Португалия'
        },
        12: {
            name: 'Иран'
        },
        13: {
            name: 'Болгария'
        },
        14: {
            name: 'Йемен'
        },
        15: {
            name: 'Южная Корея'
        },
        16: {
            name: 'Вьетнам'
        },
    },
    licences: {
        1: {
            id: 1,
            regionIds: [1],
            name: 'Аэропорты Евразии',
            imageKey: 'eurasia',
            cost: 10000,
        },
        2: {
            id: 2,
            regionIds: [2],
            name: 'Аэропорты Африки',
            imageKey: 'africa',
            cost: 10000,
        },
        3: {
            id: 3,
            regionIds: [3],
            name: 'Аэропорты Северной Америки',
            imageKey: 'northAmerica',
            cost: 10000,
        },
        4: {
            id: 4,
            regionIds: [4],
            name: 'Аэропорты Южной Америки',
            imageKey: 'southAmerica',
            cost: 10000,
        },
        5: {
            id: 5,
            regionIds: [5],
            name: 'Аэропорты Австралии и Океании',
            imageKey: 'australia',
            cost: 10000,
        },
        6: {
            id: 6,
            regionIds: [6],
            name: 'Аэродромы Антарктиды',
            imageKey: 'antarctida',
            cost: 10000,
        },
        
    },
    currentLicenceIds: [1, 2]
}

export function airportsReducer(state = initialState, action) {
    const { type, payload = {} } = action
    const { licence } = payload
    switch (type) {
        case pageActionTypes.ADD_LICENCE:
            return {...state, currentLicenceIds: [...state.currentLicenceIds, licence.id]}
        default: return state
    }    
}