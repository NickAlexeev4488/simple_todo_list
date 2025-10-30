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


// Добавляем дочерние теги
logo.appendChild(logoText)
searchDiv.appendChild(searchInput)
header.append(logo, searchDiv)

body.appendChild(header)