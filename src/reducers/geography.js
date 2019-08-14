import { pageActionTypes } from '../constants/action-types'

const initialState = {
    airports: {
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
        18: {
            id: 18,
            name: 'Порт-Судан',
            iata: 'PZU',
            countriesId: 17,
            latt: 19.43,
            longt: 37.23,
            costOnHour: 20,
            regionId: 2,
        },
        19: {
            id: 19,
            name: 'Киншаса Нджили',
            iata: 'FIH',
            countriesId: 18,
            latt: -4.39,
            longt: 15.44,
            costOnHour: 10,
            regionId: 2,
        },
        20: {
            id: 20,
            name: 'Абиджан Порт-Буэ',
            iata: 'ABJ',
            countriesId: 19,
            latt: 5.26,
            longt: -3.93,
            costOnHour: 10,
            regionId: 2,
        },
        // 21: {
        //     id: 21,
        //     name: 'Антананариву Ивато',
        //     iata: 'TNR',
        //     countriesId: 20,
        //     latt: -18.8,
        //     longt: 47.48,
        //     costOnHour: 10,
        //     regionId: 2,
        // },
        // 22: {
        //     id: 22,
        //     name: 'Александрия Эль-Нужа',
        //     iata: 'ALY',
        //     countriesId: 21,
        //     latt: 31.18,
        //     longt: 29.95,
        //     costOnHour: 10,
        //     regionId: 2,
        // },
        // 23: {
        //     id: 23,
        //     name: 'Виланкулос',
        //     iata: 'VNX',
        //     countriesId: 22,
        //     latt: -22.02,
        //     longt: 35.31,
        //     costOnHour: 20,
        //     regionId: 2,
        // },
        24: {
            id: 24,
            name: 'Сингапур Чанги',
            iata: 'SIN',
            countriesId: 23,
            latt: 1.35,
            longt: 103.99,
            costOnHour: 30,
            regionId: 5,
        },


        25: {
            id: 25,
            name: 'Джаяпура Сентани',
            iata: 'DJJ',
            countriesId: 24,
            latt: -2.58,
            longt: 140.52,
            costOnHour: 20,
            regionId: 5,
        },

        // 26: {
        //     id: 26,
        //     name: 'Кэрнс',
        //     iata: 'CNS',
        //     countriesId: 9,
        //     latt: -16.89,
        //     longt: 145.76,
        //     costOnHour: 10,
        //     regionId: 5,
        // },

        // 27: {
        //     id: 27,
        //     name: 'Хобарт',
        //     iata: 'HBA',
        //     countriesId: 9,
        //     latt: -42.84,
        //     longt: 147.51,
        //     costOnHour: 20,
        //     regionId: 5,
        // },

        // 28: {
        //     id: 28,
        //     name: 'Ванака',
        //     iata: 'WKA',
        //     countriesId: 9,
        //     latt: -44.72,
        //     longt: 169.25,
        //     costOnHour: 10,
        //     regionId: 5,
        // },

        // 29: {
        //     id: 29,
        //     name: 'Франциско Бангой',
        //     iata: 'DVO',
        //     countriesId: 25,
        //     latt: 7.13,
        //     longt: 125.65,
        //     costOnHour: 20,
        //     regionId: 5,
        // },

        30: {
            id: 30,
            name: 'Бенито Хуарес',
            iata: 'MEX',
            countriesId: 26,
            latt: 19.44,
            longt: -99.07,
            costOnHour: 20,
            regionId: 3,
        },

        31: {
            id: 31,
            name: 'Сан-Франциско',
            iata: 'SFO',
            countriesId: 7,
            latt: 37.62,
            longt: -122.37,
            costOnHour: 20,
            regionId: 3,
        },
       
        // 32: {
        //     id: 32,
        //     name: ' Харбор Уотер',
        //     iata: 'CXH',
        //     countriesId: 7,
        //     latt: 49.29,
        //     longt: -123.12,
        //     costOnHour: 20,
        //     regionId: 3,
        // },
        // 33: {
        //     id: 33,
        //     name: 'Денвер',
        //     iata: 'DEN',
        //     countriesId: 7,
        //     latt: 39.86,
        //     longt: -104.67,
        //     costOnHour: 20,
        //     regionId: 3,
        // },
        // 34: {
        //     id: 34,
        //     name: 'Луи Армстронг',
        //     iata: 'MSY',
        //     countriesId: 7,
        //     latt: 29.99,
        //     longt: -90.26,
        //     costOnHour: 20,
        //     regionId: 3,
        // },
        // 35: {
        //     id: 35,
        //     name: 'Форт-Лодердейл Голливуд',
        //     iata: 'FLL',
        //     countriesId: 7,
        //     latt: 26.07,
        //     longt: -80.15,
        //     costOnHour: 30,
        //     regionId: 3,
        // },
        // 36: {
        //     id: 36,
        //     name: 'Нук',
        //     iata: 'GOH',
        //     countriesId: 27,
        //     latt: 64.19,
        //     longt: -51.68,
        //     costOnHour: 10,
        //     regionId: 3,
        // },
        // 37: {
        //     id: 37,
        //     name: 'Ранкин-Инлет',
        //     iata: 'YRT',
        //     countriesId: 6,
        //     latt: 62.81,
        //     longt: -92.12,
        //     costOnHour: 10,
        //     regionId: 3,
        // },
        // 38: {
        //     id: 38,
        //     name: 'Пунта-Аренас',
        //     iata: 'PUQ',
        //     countriesId: 28,
        //     latt: -53,
        //     longt: -70.85,
        //     costOnHour: 10,
        //     regionId: 4,
        // },
        39: {
            id: 39,
            name: 'Сеймур',
            iata: 'GPS',
            countriesId: 29,
            latt: -0.45,
            longt: -90.27,
            costOnHour: 40,
            regionId: 4,
        },
        40: {
            id: 40,
            name: 'Виру Виру',
            iata: 'VVI',
            countriesId: 30,
            latt: -17.64,
            longt: -63.14,
            costOnHour: 10,
            regionId: 4,
        },
        41: {
            id: 41,
            name: 'Уилсон Фонсека',
            iata: 'STM',
            countriesId: 5,
            latt: -2.42,
            longt: -54.79,
            costOnHour: 20,
            regionId: 4,
        },
        // 42: {
        //     id: 42,
        //     name: 'Боа-Виста',
        //     iata: 'BVB',
        //     countriesId: 5,
        //     latt: 2.85,
        //     longt: -60.69,
        //     costOnHour: 20,
        //     regionId: 4,
        // },
        // 43: {
        //     id: 43,
        //     name: 'Маркос Гелаберт',
        //     iata: 'PAC',
        //     countriesId: 31,
        //     latt: 8.97,
        //     longt: -79.56,
        //     costOnHour: 20,
        //     regionId: 4,
        // },
        44: {
            id: 44,
            name: 'Тениенте Родолфо Мфрша Мартина',
            iata: 'TNM',
            countriesId: 32,
            latt: -62.19,
            longt: -58.98,
            costOnHour: 100,
            regionId: 6,
        },
        45: {
            id: 45,
            name: 'Пегасус Филд',
            iata: 'NZPG',
            countriesId: 32,
            latt: -77.57,
            longt: -166.31,
            costOnHour: 100,
            regionId: 6,
        },
        46 : {
            id: 46,
            name: 'Дейвис ',
            iata: 'NZD',
            countriesId: 32,
            latt: -68.35,
            longt: 77.58,
            costOnHour: 100,
            regionId: 6,
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
        17: {
            name: 'Судан'
        },
        18: {
            name: 'Демократическая Республика Конго'
        },
        19: {
            name: 'Кот д\'Ивуар'
        },
        20: {
            name: 'Мадагаскар'
        },
        21: {
            name: 'Египет'
        },
        22: {
            name: 'Мозамбик'
        },
        23: {
            name: 'Сингапур'
        },
        24: {
            name: 'Индонезия'
        },
        25: {
            name: 'Филиппины'
        },
        26: {
            name: 'Мексика'
        },
        27: {
            name: 'Гренландия'
        },
        28: {
            name: 'Чили'
        },
        29: {
            name: 'Эквадор'
        },
        30: {
            name: 'Боливия'
        },
        31: {
            name: 'Панама'
        },
        32: {
            name: 'Антарктида'
        }
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
    currentLicenceIds: [1]
}

export function geographyReducer(state = initialState, action) {
    const { type, payload = {} } = action
    const { licence } = payload
    switch (type) {
        case pageActionTypes.ADD_LICENCE:
            return {...state, currentLicenceIds: [...state.currentLicenceIds, licence.id]}
        default: return state
    }    
}