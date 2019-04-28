const countries = {
    1: {
        name: 'Алжир'
    },
    2: {
        name: 'Индия'
    },
    3: {
        name: 'ЮАР'
    }
}

const initialState = {
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
    }
}

export function airportsReducer(state = initialState) {
    return state
}