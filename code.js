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
let newCardClose = document.createElement('button')
newCardClose.classList.add('newCardClose')
let newCardText = document.createElement('textarea')
newCardText.classList.add('newCardText')
newCardText.placeholder = 'Пишите здесь'
let newCardDate = document.createElement('input')
newCardDate.classList.add('newCardDate')
newCardDate.type = 'date'
newCardDate.required = true
let newCardButton2 = document.createElement('button')
newCardButton2.classList.add('newCardButton2')

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

// Логика карточек
let cards = []
let editingCard = null

function renderCards() {
  cardContainer.innerHTML = ''
  cards.forEach((card, index) => {

    let cardBlockTop = document.createElement('div')
    cardBlockTop.classList.add('cardBlockTop')
    let cardBlockTopLeft = document.createElement('div')
    cardBlockTopLeft.classList.add('cardBlockTopLeft')
    let cardBlockTopRight = document.createElement('div')
    cardBlockTopRight.classList.add('cardBlockTopRight')

    let cardBlockBottom = document.createElement('div')
    cardBlockBottom.classList.add('cardBlockBottom')

    let cardBlock = document.createElement('div')
    cardBlock.classList.add('cardBlock')

    let cardName = document.createElement('h3')
    cardName.classList.add('cardName')
    cardName.textContent = card.cardName

    let cardText = document.createElement('p')
    cardText.classList.add('cardText')
    cardText.textContent = card.cardText

    let cardDate = document.createElement('span')
    cardDate.classList.add('cardDate')
    cardDate.textContent = card.cardDate

    let editButton = document.createElement('button')
    editButton.classList.add('editButton')
    editButton.textContent = 'Изменить'
    editButton.addEventListener('click', () => {
      editingCard = index
      newCardName.value = card.cardName
      newCardText.value = card.cardText
      newCardDate.value = card.cardDate
      newCardButton2.innerText = 'Сохранить'
      newCardBlock.classList.remove('hidden')
      blackBlock.classList.remove('hidden')
    })

    let deleteButton = document.createElement('button')
    deleteButton.classList.add('deleteButton')
    deleteButton.textContent = 'Удалить'
    deleteButton.addEventListener('click', () => {
      cards.splice(index, 1)
      renderCards()
    })

    cardBlockTopLeft.append(cardName, cardDate)
    cardBlockTopRight.append(editButton, deleteButton)
    cardBlockTop.append(cardBlockTopLeft, cardBlockTopRight)
    cardBlockBottom.append(cardText)
    cardBlock.append(cardBlockTop, cardBlockBottom)
    cardContainer.appendChild(cardBlock)
  })
}

newCardButton.addEventListener('click', () => {
  editingCard = null
  newCardName.value = 'Новая запись'
  newCardText.value = ''
  newCardDate.valueAsDate = new Date()
  newCardBlock.classList.remove('hidden')
  blackBlock.classList.remove('hidden')
  newCardButton2.innerText = 'Создать запись'
})

newCardClose.addEventListener('click', () => {
  newCardBlock.classList.add('hidden')
  blackBlock.classList.add('hidden')
})

blackBlock.addEventListener('click', () => {
  newCardBlock.classList.add('hidden')
  blackBlock.classList.add('hidden')
})

newCardButton2.addEventListener('click', () => {
  let cardData = {
    cardName: newCardName.value,
    cardText: newCardText.value,
    cardDate: newCardDate.value
  }

  if (editingCard !== null) {
    cards[editingCard] = cardData
  } else {
    cards.push(cardData)
  }

  renderCards()
  newCardBlock.classList.add('hidden')
  blackBlock.classList.add('hidden')
})
