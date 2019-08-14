import { MapActions } from '../constants/map-actions'
import moment from 'moment'
import { flightStatuses } from '../constants/flight-status'

export function getFlightInTime(originFlight, airports, orders, currentTime ) {
    const flight = {...originFlight}
    if (flight.orderId) {
        const order = Object.values(orders).find(order => order.id === flight.orderId)
        flight.fromId = order.fromId
        flight.toId = order.toId
        flight.dateTakeOff = order.dateTakeOff
        flight.dateLanding = order.dateLanding
        flight.pay = order.pay
        flight.cost = order.cost
        flight.name = `${order.name}`
        flight.description = order.description
    }
    
    flight.from = {...airports.find(value => value.id === flight.fromId)}
    flight.to = {...airports.find(value => value.id === flight.toId)}
    const { dateTakeOff, dateLanding } = flight
    const oldProgress = flight.progress
    const oldStatus = flight.status

    switch(true) {
        case (oldStatus === flightStatuses.CANCELED):
            flight.progress = -1
            flight.prevProgress = -1
            flight.status = flightStatuses.CANCELED
            break
        case (!dateTakeOff):
            flight.progress = -1
            flight.prevProgress = -1
            flight.status = flightStatuses.NOT_TAKEOFF
            break
        case (!dateLanding):
            flight.progress = -1
            flight.prevProgress = -1
            flight.status = flightStatuses.NOT_LANDING
            break   
        case (currentTime < dateTakeOff):
            flight.progress = -1   
            flight.prevProgress = -1         
            flight.status = flightStatuses.PLANED
            break
        case (currentTime.isSame(dateTakeOff)):
            if (flight.status !== flightStatuses.CANCELED) {
                flight.progress = 0
                flight.prevProgress = 0
                flight.status = flightStatuses.TAKE_OFF
            } else {
                flight.progress = -1
                flight.prevProgress = -1
            }
            break  
        case (currentTime.isSame(dateLanding)):
            flight.progress = 100
            flight.prevProgress =  (currentTime.diff(dateTakeOff, 'hours') - 1) / 
                dateLanding.diff(dateTakeOff, 'hours') * 100 
            flight.status = flightStatuses.LANDING
            break      
        case (currentTime > dateLanding):
                flight.progress = 101
                flight.prevProgress = 101
                flight.status = flightStatuses.DONE
            break
        case (dateTakeOff < currentTime && currentTime < dateLanding):             
            flight.progress = currentTime.diff(dateTakeOff) / 
                dateLanding.diff(dateTakeOff) * 100 
            flight.prevProgress =  (currentTime.diff(dateTakeOff, 'hours') - 1) / 
                dateLanding.diff(dateTakeOff, 'hours') * 100   
            flight.status = flightStatuses.IN_PROGRESS
            break
        default: break;
    }
    flight.mapAction = getMapAction(flight.prevProgress, flight.progress)
    flight.oldProgress = oldProgress
    return flight
}

export function getOrdersInTime(flight, airports, orders, currentTime ) {
    if (flight.orderId) {
        const order = Object.values(orders).find(order => order.id === flight.orderId)
        flight.fromId = order.fromId
        flight.toId = order.toId
        flight.dateTakeOff = order.dateTakeOff
        flight.dateLanding = order.dateLanding
        flight.pay = order.pay
        flight.cost = order.cost
        flight.name = `${order.name}`
        flight.description = order.description
    }
    
    flight.from = {...airports.find(value => value.id === flight.fromId)}
    flight.to = {...airports.find(value => value.id === flight.toId)}
    const { dateTakeOff, dateLanding } = flight
    const oldProgress = flight.progress

    switch(true) {
        case (!dateTakeOff):
            flight.progress = -1
            flight.status = flightStatuses.NOT_TAKEOFF
            break
        case (!dateLanding):
            flight.progress = -1
            flight.progress = 0
            flight.status = flightStatuses.NOT_LANDING
            break   
        case (currentTime < dateTakeOff):
            flight.progress = -1
            flight.status = flightStatuses.PLANED
            break
        case (currentTime.isSame(dateTakeOff)):
            flight.progress = 0
            flight.status = flightStatuses.TAKE_OFF
            break  
        case (currentTime.isSame(dateLanding)):
            flight.progress = 100
            flight.status = flightStatuses.LANDING
            break      
        case (currentTime > dateLanding):
            flight.progress = 101
            flight.status = flightStatuses.DONE
            break
        case (dateTakeOff < currentTime && currentTime < dateLanding):  
            flight.progress = currentTime.diff(dateTakeOff) / 
                dateLanding.diff(dateTakeOff) * 100 
            flight.status = flightStatuses.IN_PROGRESS 
            break
        default: break;
    }
    flight.mapAction = getMapAction(oldProgress, flight.progress)    
    return flight
}

export function getMapAction(oldProgress, newProgress ) {    
    switch (true) {
        case oldProgress === 0 && newProgress === 0:
            return MapActions.ADD_FLIGHT
        case oldProgress > -1 && newProgress > -1: 
            return MapActions.CHANGE_PROGRESS       
        default: return MapActions.NONE
    }    
}

export function getApproachFlight(flightId, tails, flights, fuelCost, 
    airportDistances, maxFlightId, currentTime) {
    const baseFlight = flights.find(flight => flight.id === flightId)
    const baseTail = tails.find(tail => tail.id === baseFlight.tailId)
    const tailFlights = 
        flights.filter(flight => flight.status !== flightStatuses.CANCELED &&
            flight.tailId === baseTail.id &&
            flight.dateTakeOff.isBefore(baseFlight.dateTakeOff))
            .sort(flightDateSortPredicatInvert)    
    const dateLanding = baseFlight.dateTakeOff.clone().add(-1, 'hours')
    const fromId = (tailFlights.length > 0) ? tailFlights[0].toId : baseTail.airportId
    const toId = baseFlight.fromId
    const { dateTakeOff, cost } = 
        getUpdatedDateAndCost(dateLanding, dateType.LANDING, fromId, toId, fuelCost, airportDistances)

    return {
        dateTakeOff,
        dateLanding,
        fromId,
        toId,
        cost,
        id: maxFlightId + 1,
        name: `Подлет ${maxFlightId + 1}`,
        tail: baseTail,
        tailId: baseTail.id,
        status: dateTakeOff.isAfter(currentTime) || dateTakeOff.isSame(currentTime) ? 
            'planned' : 'canceled',
        progress: -1,
        orderId: null,
        pay: 0,
        linkedFlightId: baseFlight.id,
      }
}

export function getEmptyFlight(flightId, tailId, orderId) {    
    return {
        id: flightId,
        name: `Flight ${flightId}`,
        tail: null,
        tailId: tailId || null,
        fromId: null,
        toId: null,
        dateTakeOff: null,
        dateLanding: null,
        status: 'planned',
        progress: -1,
        orderId: orderId || null,
        pay: 0,
      }
}

const getCost = (dateTakeOff, dateLanding, fuelCost) => {
    return dateLanding.diff(moment.utc(dateTakeOff), 'hours') * fuelCost
}

export function getRandomFromToAirportIds(airportIds) {
    const fromRandomIndex = Math.round(Math.random() * (airportIds.length - 1))
    const fromId = airportIds[fromRandomIndex]
    airportIds.splice(fromRandomIndex, 1)
    const toRandomIndex = Math.round(Math.random() * (airportIds.length - 1))
    const toId =  airportIds[toRandomIndex]
    return { fromId, toId }
}

export  function getCostAndPay(fromId, toId, airportDistances, airports, fuelCost) {
    const findAirport = (id) => airports.find(airport => airport.id === id)
    const cost = airportDistances(fromId, toId) * fuelCost
    const allowance = findAirport(fromId).regionId !== findAirport(toId).regionId ? 2000 : 0
    const pay = cost + Math.round(2000 + Math.random() * 1000) + allowance
    return { cost, pay }
}

export const dateType = {
    TAKE_OFF: 'takeOff',
    LANDING: 'landing',
}

export const getUpdatedDateAndCost = (date, dateType, airport1Id, airport2Id, fuelCost, airportDistances) => {
    const flightTime = airportDistances(airport1Id, airport2Id)
    const dateTakeOff = (dateType === dateType.TAKE_OFF) ? date : date.clone().add(-flightTime, 'hours')
    const dateLanding = (dateType === dateType.LANDING) ? date : date.clone().add(flightTime, 'hours')
    const cost = getCost(dateTakeOff, dateLanding, fuelCost)
    return { dateLanding, dateTakeOff, cost }
}

export function getOrderDescription() {
    const payloads = [
        { description: 'оружия', shorts: ['Быстрые пули', 'Укус смерти', 'Маленький *Бум*', 'Крошка 40-мм', 'Вжух и все'] },
        { description: 'элитного спиртного', shorts: ['Белое полусладкое', 'Бренди от доброжелателя', 'Стакашка рома', 'Безалкогольное и бессмысленное', 'Настойка на стрекозах'] },
        { description: 'научного оборудования', shorts: ['Штука с кнопками', 'Бегающие огоньки', 'Синхрофазотрон', 'Скрепки', 'Синяя изолента'] },
        { description: 'зонтиков для коктейлей', shorts: ['Удиви свою подружку', 'Я это не заказывал!', 'Что-то сладенькое', 'Серпантин', 'Подставка под пиво'] },
        { description: 'солнечных очков', shorts: ['Крутота', 'Вижу облака', 'Глаза больше не болят', 'Like a boss', 'Вспомни диско'] },
        { description: 'патронов', shorts: ['Быстро реши проблемы', 'Последний для себя', 'Много не бывает', 'Соль и спички', 'Серебрянная пуля'] },
        { description: 'плавательных шапочек', shorts: ['Будь лысым', 'Резиновое веселье', 'Красная шапочка', 'Аэродинамичный', 'Шапочка чемпиона'] },
        { description: 'канареек', shorts: ['Птичка флегма', 'Птичка предупреждала', 'Последнее предупреждение', 'Все тихо', 'Цвет оптимизма'] },
        { description: 'фейерверков', shorts: ['Разгоняем демонов', 'Время целоваться', 'Мы так ждали этого', 'И все???', 'Заряжай деньгами'] },
        { description: 'авокадо', shorts: ['Салат в пути', 'Косточка рядом', 'Зеленая картошка', 'Можно масочку намутить', 'Типо польза'] },
        { description: 'чулок и подвязок', shorts: ['Черное кружевное', 'Красное кружевное', 'Белое кружевное', 'Крупная сетка', 'Старомодные чулочки'] },
        { description: 'чулок и подвязок', shorts: ['Черное кружевное', 'Красное кружевное', 'Белое кружевное', 'Крупная сетка', 'Старомодные чулочки'] },
        { description: 'чулок и подвязок', shorts: ['Черное кружевное', 'Красное кружевное', 'Белое кружевное', 'Крупная сетка', 'Старомодные чулочки'] },
    ]

    const places = [
        { description: 'для местного зоопарка', shorts: ['тиграм на радость', 'для кроликов', 'надежда утконоса', 'с сурикатами', 'для серпентария'] },
        { description: 'для фестиваля воздушных шаров', shorts: ['вверх! вверх!', 'для стратостата', 'и уходим вверх', 'и сбрасываем баласт', 'для подьема'] },
        { description: 'для бара на пляже', shorts: ['для блондиночек', 'для брюнеточек', 'для качка на протеинах', 'для дедульки в ударе', 'на всю ночь'] },
        { description: 'для Корпорации Зла', shorts: ['для роботов убийц', 'для пираний', 'для старенького Бонда', 'для kpi', 'на заседание по захвату мира'] },
        { description: 'для чемпионата по плаванию', shorts: ['и идем вниз', 'для спасательного круга', 'для дорожки кролистов', 'для эстафеты', 'чтоб синхронно'] },
        { description: 'для горнодобывающей компании', shorts: ['чтоб копалось хорошо', 'для мастера', 'для новой шахты', 'для карьера', 'на переработку'] },
        { description: 'для мишленовского рестарана', shorts: ['на десерт', 'на ланч', 'повору под нож', 'для критика', 'офикам на радость'] },
        { description: 'для авиакомпании', shorts: ['и от винта!', 'для ICAO', 'стюардессам', 'чтоб леталось', 'и идем по приборам'] },
    ]

    const randomPayload = Math.round(Math.random() * (payloads.length - 1))
    const randomPlace = Math.round(Math.random() * (places.length - 1))
    const randomPayloadShort = Math.round(Math.random() * (5 - 1))
    const randomPlaceShort = Math.round(Math.random() * (5 - 1))

    return {
        description: `Груз ${payloads[randomPayload].description} ${places[randomPlace].description}`,
        title: `${payloads[randomPayload].shorts[randomPayloadShort]} ${places[randomPlace].shorts[randomPlaceShort]}`
    }
}

export const flightDateSortPredicat = (a, b) => a.dateTakeOff.isAfter(b.dateTakeOff) ? 1 : -1
export const flightDateSortPredicatInvert = (a, b) => a.dateTakeOff.isBefore(b.dateTakeOff) ? 1 : -1
