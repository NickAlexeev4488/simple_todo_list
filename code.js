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
blackBlock.classList.add('blackBlock', 'hidden')

// Блок добавления карточки
let newCardBlock = document.createElement('div')
newCardBlock.classList.add('newCardBlock', 'hidden')

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

// Контейнер кнопок
let controlPanel = document.createElement('div')
controlPanel.classList.add('controlPanel')

// Фильтры
let filterAllButton = document.createElement('button')
filterAllButton.classList.add('sortButton', 'activeFilter')
filterAllButton.textContent = 'Все'

let filterCompletedButton = document.createElement('button')
filterCompletedButton.classList.add('sortButton')
filterCompletedButton.textContent = 'Выполненные'

let filterUncompletedButton = document.createElement('button')
filterUncompletedButton.classList.add('sortButton')
filterUncompletedButton.textContent = 'Невыполненные'

// Сортировка
let sortByDateButton = document.createElement('button')
sortByDateButton.classList.add('sortButton')
sortByDateButton.textContent = 'Сортировать по дате'

controlPanel.append(filterAllButton, filterCompletedButton, filterUncompletedButton, sortByDateButton)

// Добавляем всё на страницу
main.append(newCardButton, controlPanel, newCardBlock, cardContainer)
body.append(blackBlock, header, main)

// Логика карточек
let cards = []
let editingCard = null
let currentFilter = 'all'
let searchQuery = ''
let dragSrcIndex = null

function renderCards() {
  cardContainer.innerHTML = ''

  // Фильтрация по статусу и поиску
  let filteredCards = cards.filter(card => {
    if (currentFilter === 'completed' && !card.completed) return false
    if (currentFilter === 'uncompleted' && card.completed) return false

    if (searchQuery && !card.cardName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    return true
  })

  if (filteredCards.length === 0) {
    let emptyMsg = document.createElement('p')
    emptyMsg.classList.add('emptyMessage')
    emptyMsg.textContent = 'Нет записей, удовлетворяющих условиям поиска.'
    cardContainer.appendChild(emptyMsg)
    return
  }

  // Отрисовка карточек
  filteredCards.forEach((card) => {
    let index = cards.indexOf(card)
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
    cardBlock.setAttribute('draggable', 'true')

    if (card.completed) cardBlock.classList.add('completed')

    let cardName = document.createElement('h3')
    cardName.classList.add('cardName')
    cardName.textContent = card.cardName
    if (card.completed) cardName.classList.add('completedName')

    let cardText = document.createElement('p')
    cardText.classList.add('cardText')
    cardText.textContent = card.cardText

    let cardDate = document.createElement('span')
    cardDate.classList.add('cardDate')
    cardDate.textContent = card.cardDate

    let completeCheckbox = document.createElement('input')
    completeCheckbox.type = 'checkbox'
    completeCheckbox.classList.add('completeCheckbox')
    completeCheckbox.checked = card.completed || false
    completeCheckbox.addEventListener('change', () => {
      card.completed = completeCheckbox.checked
      renderCards()
    })

    let editButton = document.createElement('button')
    editButton.classList.add('editButton')
    editButton.textContent = 'Изменить'
    editButton.addEventListener('click', () => {
      editingCard = cards.indexOf(card)
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
      cards.splice(cards.indexOf(card), 1)
      renderCards()
    })

    // Drag and Drop обработчики
    cardBlock.addEventListener('dragstart', () => {
      dragSrcIndex = index
    })

    cardBlock.addEventListener('dragover', (e) => {
      e.preventDefault()
    })

    cardBlock.addEventListener('dragleave', () => {
      cardBlock.classList.remove('drag-over')
    })

    cardBlock.addEventListener('drop', () => {
      if (dragSrcIndex === null) {
        return
      }
      let draggedCard = cards.splice(dragSrcIndex, 1)[0]
      let dropIndex = index
      cards.splice(dropIndex, 0, draggedCard)
      dragSrcIndex = null
      renderCards()
    })

    cardBlockTopLeft.append(cardName, cardDate)
    cardBlockTopRight.append(completeCheckbox, editButton, deleteButton)
    cardBlockTop.append(cardBlockTopLeft, cardBlockTopRight)
    cardBlockBottom.append(cardText)
    cardBlock.append(cardBlockTop, cardBlockBottom)
    cardContainer.appendChild(cardBlock)
  })
  saveCards()
}

// Кнопки фильтрации
function setActiveFilter(button) {
  document.querySelectorAll('.sortButton').forEach(b => b.classList.remove('activeFilter'))
  button.classList.add('activeFilter')
}

filterAllButton.addEventListener('click', () => {
  currentFilter = 'all'
  setActiveFilter(filterAllButton)
  renderCards()
})

filterCompletedButton.addEventListener('click', () => {
  currentFilter = 'completed'
  setActiveFilter(filterCompletedButton)
  renderCards()
})

filterUncompletedButton.addEventListener('click', () => {
  currentFilter = 'uncompleted'
  setActiveFilter(filterUncompletedButton)
  renderCards()
})

// Сортировка
sortByDateButton.addEventListener('click', () => {
  cards.sort((b, a) => new Date(b.cardDate) - new Date(a.cardDate))
  renderCards()
})

// Поиск по названию
searchInput.addEventListener('input', () => {
  searchQuery = searchInput.value.trim()
  renderCards()
})

// Создание и редактирование карточек
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
    cardDate: newCardDate.value,
    completed: false
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

// Сохранение карточек
function saveCards() {
  localStorage.setItem('simpleListCards', JSON.stringify(cards))
}

// Загрузка карточек при запуске
function loadCards() {
  let stored = localStorage.getItem('simpleListCards')
  if (stored) {
    try {
      cards = JSON.parse(stored)
      if (!Array.isArray(cards)) cards = []
    } catch (e) {
      cards = []
    }
  }
  renderCards()
}

// Загружаем карточки при старте
loadCards()
