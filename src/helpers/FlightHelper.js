// TODO сделать через inmutable
import { MapActions } from '../constants/map-actions'

export function getFlightInTime(flight, airports, orders, currentTime ) {
    // flight.pay = flight.pay ? flight.pay : 0

    if (flight.orderId) {
        const order = orders[flight.orderId]
        flight.fromId = order.fromId
        flight.toId = order.toId
        flight.dateTakeOff = order.dateTakeOff
        flight.dateLanding = order.dateLanding
        flight.pay = order.pay
        flight.cost = order.cost
    }
    
    flight.from = {...airports.find(value => value.id === flight.fromId)}
    flight.to = {...airports.find(value => value.id === flight.toId)}
    const { dateTakeOff, dateLanding } = flight
    const oldProgress = flight.progress

    switch(true) {
        case (!dateTakeOff):
            flight.progress = -1
            flight.status = 'not takeOff'
            break
        case (!dateLanding):
            flight.progress = -1
            flight.progress = 0
            flight.status = 'not landing' 
            break   
        case (currentTime < dateTakeOff):
            flight.progress = -1
            // TODO статусы константами
            flight.status = 'planed'
            break
        case (currentTime.isSame(dateTakeOff)):
            flight.progress = 0
            flight.status = 'takeOff'
            break  
        case (currentTime.isSame(dateLanding)):
            flight.progress = 100
            flight.status = 'landing'
            break      
        case (currentTime > dateLanding):
            flight.progress = 101
            flight.status = 'done'
            break
        case (dateTakeOff < currentTime && currentTime < dateLanding):  
            flight.progress = currentTime.diff(dateTakeOff) / 
                dateLanding.diff(dateTakeOff) * 100 
            flight.progressNext = currentTime.clone().add(1, 'hour').diff(dateTakeOff) / 
                dateLanding.diff(dateTakeOff) * 100      
            flight.status = 'in progress'    
            break
        default: break;
    }
    flight.mapAction = getMapAction(oldProgress, flight.progress)
    return flight
}

export function getMapAction(oldProgress, newProgress ) {
    if (oldProgress !== newProgress) {
        switch (true) {
            case oldProgress === -1 && newProgress > -1:
                return MapActions.ADD_FLIGHT
            case oldProgress > -1 && newProgress > -1: 
                return MapActions.CHANGE_PROGRESS       
            default: return MapActions.NONE
        }
    }
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

    console.log(randomPayload + ' ' + randomPlace)
    return {
        description: `Груз ${payloads[randomPayload].description} ${places[randomPlace].description}`,
        title: `${payloads[randomPayload].shorts[randomPayloadShort]} ${places[randomPlace].shorts[randomPlaceShort]}`
    }
}
