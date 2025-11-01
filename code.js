let body = document.body

// Шапка
let header = document.createElement('header')
header.classList.add('headerEl')

// Составляющие шапки
let logo = document.createElement('div')
logo.classList.add('logo')
let logoText = document.createElement('p')
logoText.classList.add('logoText')
logoText.textContent = 'SimpleList'

let searchDiv = document.createElement('div')
searchDiv.classList.add('searchDiv')
let searchInput = document.createElement('input')
searchInput.classList.add('searchInput')
searchInput.placeholder = 'Поиск по названию'


// Добавляем дочерние теги header
logo.appendChild(logoText)
searchDiv.appendChild(searchInput)
header.append(logo, searchDiv)

// Основной блок
let main = document.createElement('section')
main.classList.add('mainBlock')

// Кнопка добавления карточки
let newCardButton = document.createElement('button')
newCardButton.classList.add('newCardButton')
newCardButton.innerText = 'Новая запись'

// Блок затемнения
let blackBlock = document.createElement('div')
blackBlock.classList.add('blackBlock')
blackBlock.classList.add('hidden')

// Блок добавления карточки
let newCardBlock = document.createElement('div')
newCardBlock.classList.add('newCardBlock')
newCardBlock.classList.add('hidden')
let newCardBlockTop = document.createElement('div')
newCardBlockTop.classList.add('newCardBlockTop')
let newCardBlockBottom = document.createElement('div')
newCardBlockBottom.classList.add('newCardBlockBottom')
let newCardBlockBottomRight = document.createElement('div')
newCardBlockBottomRight.classList.add('newCardBlockBottomRight')
let newCardName = document.createElement('input')
newCardName.classList.add('newCardName')
newCardName.value = 'Новая запись'
let newCardClose = document.createElement('button')
newCardClose.classList.add('newCardClose')
let newCardText = document.createElement('textarea')
newCardText.classList.add('newCardText')
newCardText.placeholder = 'Пишите здесь'
let newCardDate = document.createElement('input')
newCardDate.classList.add('newCardDate')
newCardDate.type = 'date'
newCardDate.valueAsDate = new Date()
newCardDate.required = true
let newCardButton2 = document.createElement('button')
newCardButton2.classList.add('newCardButton2')
newCardButton2.innerText = 'Создать запись'

newCardBlockTop.append(newCardName, newCardClose)
newCardBlockBottomRight.append(newCardDate, newCardButton2)
newCardBlockBottom.append(newCardText, newCardBlockBottomRight)
newCardBlock.append(newCardBlockTop, newCardBlockBottom)

// Контейнер карточек
let cardContainer = document.createElement('div')
cardContainer.classList.add('cardContainer')

// Добавляем дочерние теги main
main.appendChild(newCardButton)
main.appendChild(newCardBlock)
main.appendChild(cardContainer)

body.appendChild(blackBlock)
body.appendChild(header)
body.appendChild(main)

newCardButton.addEventListener('click', () => {
  newCardBlock.classList.remove('hidden')
  blackBlock.classList.remove('hidden')
})

newCardClose.addEventListener('click', () => {
  newCardBlock.classList.add('hidden')
  blackBlock.classList.add('hidden')
})

blackBlock.addEventListener('click', () => {
  newCardBlock.classList.add('hidden')
  blackBlock.classList.add('hidden')
})