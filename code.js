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

// Блок добавления карточки
let newCardButton = document.createElement('button')
newCardButton.classList.add('newCardButton')
newCardButton.innerText = 'Новая запись'

// Контейнер карточек
let cardContainer = document.createElement('div')
cardContainer.classList.add('cardContainer')

// Добавляем дочерние теги main
main.appendChild(newCardButton)
main.appendChild(cardContainer)

body.appendChild(header)
body.appendChild(main)