### MapMapping

Добро пожаловать в map-mapping, симулятор полетного диспетчера! Вам предстоит вести свою авиакомпанию к славе и успеху через тернии поиска заказов и головную боль составления расписания.

Поиграть можно здесь: [ссылка](http://greenda.github.io/map-mapping-react)

#### Как играть?
В двух словах все просто: находим заказ, тащим его в сетку расписания, наблюдаем как борт выполняет рейс, … , Profit.

А теперь подробнее.

##### Заказы и перелеты
Здесь у нас список заказов и их отображение на сетке расписания:

![orders-panel](https://raw.github.com/greenda/map-mapping-react/master/src/assets/app-help/orders-panel.png)

Два трехбуквенника – обозначение аэропортов откуда и куда нужно доставить груз, cost – стоимость перелета (сколько потратим на топливо и т.д.), pay – сколько заказчик готов за перелет заплатить.

Решаем взять этот заказ. Перетаскиваем с панели заказов на панель перелетов. Обратите внимание на названия бортов A-1, A-2, A-3. Обозначение под названием – где сейчас стоит борт.

![create-flight-from-orderl](https://raw.github.com/greenda/map-mapping-react/master/src/assets/app-help/create-flight-from-order.png)

#### Подлет

Если в данный момент подходящих бортов нет, ищем ближайший, тащим заказ и создаем перелет подлета:

![create-approach-flight](https://raw.github.com/greenda/map-mapping-react/master/src/assets/app-help/approach-flight.png)

Внизу отображается цена связки перелетов. Если она отрицательна, то задумайтесь, стоит ли брать этот заказ для этого борта? 

Если к моменту начала перелета борт не находится в нужном для перелета аэропорте, рейс будет отменен, на сетке подкрашен красным, и борт останется, где был.

#### Магазин

В магазине можно приобрести еще лицензии для полетов над континентами, а также новые борта. Перелеты между разными континентами оплачиваются лучше, так что стоит обратить на них внимание. 

#### Финансы

Пока борт стоит в аэропорте, с компании списываются деньги за его обслуживание, от 10 до 40 единиц в зависимости от места. Большой флот – большие возможности, но и большие расходы на содержание.

#### Время

И наконец время. Двигается вперед кнопкой +. Можно отмотать к началу кнопкой |< и посмотреть историю компании.

На этом курс «Взлет – посадка» закончен, попутного ветра!

#### О проекте
Приложение написано на React – Redux, стили SCSS, карта на d3.js, геометрия для карты взята с ресурса Natural Earth, инфа по аэропортам – из открытых источников. Названия рейсов и описания – плод буйной фантазии.