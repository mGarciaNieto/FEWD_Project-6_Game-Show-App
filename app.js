const phrase = document.getElementById('phrase')
const overlay = document.getElementById('overlay')
const starGameBtn = document.querySelector('.btn__reset')
const heartTries = document.querySelectorAll('.tries')
let missed = 0
const MISSED_MAX = 5

const phrases = [
  'Break a leg',
  'By hook or by crook',
  'Cast no clout until may be out',
  'Speak of the devil',
  'Your guess is as good as mine',
  'A dime a dozen',
  'Beat around the bush',
  'Easy does it',
  'No pain no gain',
  'Pull yourself together',
  'So far so good',
  'Hang in there',
  'Hit the sack',
  'On the ball',
  'Go back to the drawing board',
  'Get your act together',
  'Cutting corners',
  'Bite the bullet',
  'A blessing in disguise',
  'Better late than never',
  'Off the hook',
  'Make a long story short',
  'Miss the boat',
  'The last straw',
  'Best of both worlds',
  'Under the weather',
  'You can say that again'
]

starGameBtn.addEventListener('click', () => {
  overlay.style.visibility = 'hidden'
  const starGame = starGameBtn.textContent
  console.log(starGame)
  if (starGame !== 'Start Game') {
    resetGame()
  }
})

function getRandomPhraseAsArray(phrases) {
  return phrases[Math.floor(Math.random() * phrases.length)].split('')
}

function addPhraseToDisplay(phraseArray) {
  for (let i = 0; i < phraseArray.length; i++) {
    const ul = document.querySelector('ul')
    if (phraseArray[i] === ' ') {
      ul.insertAdjacentHTML('beforeend', `<li class="space">${phraseArray[i]}</li>`)
    } else {
      ul.insertAdjacentHTML('beforeend', `<li class="letter">${phraseArray[i]}</li>`)
    }
  }
}

addPhraseToDisplay(getRandomPhraseAsArray(phrases))

function checkLetter(letter) {
  let letters = document.querySelectorAll('.letter')
  let letterMatch = null
  for (let i = 0; i < letters.length; i++) {
    if (letter === letters[i].textContent.toLowerCase()) {
      letters[i].classList.add('show')
      letterMatch = letter
    }
  }
  return letterMatch
}

document.getElementById('qwerty').addEventListener('click', (e) => {
  //e.preventDefault
  if (e.target.tagName === 'BUTTON') {
    e.target.className = 'chosen'
    e.target.disabled = true
    let letterFound = checkLetter(e.target.textContent)
    if (!letterFound) {
      heartTries[missed].children[0].src = 'images/lostHeart.png'
      missed++
    }
    checkWin()
  }
})

function checkWin() {
  const liLetter = document.querySelectorAll('.letter')
  const liShow = document.querySelectorAll('.show')

  if (liLetter.length === liShow.length) {
    overlay.classList.add('win')
    overlay.style.visibility = 'visible'
    overlay.children[0].textContent = "You're a winner!"
    overlay.children[1].textContent = 'Play again?'
  }
  if (missed >= MISSED_MAX) {
    overlay.classList.add('lose')
    overlay.style.visibility = 'visible'
    overlay.children[0].textContent = "You've lost!"
    overlay.children[1].textContent = 'Try again?'
  }
}

function resetGame() {
  const buttons = document.querySelectorAll('button')
  overlay.className = 'start'
  missed = 0

  const ul = document.querySelector('ul')
  while (ul.hasChildNodes()) {
    ul.removeChild(ul.firstChild)
  }

  addPhraseToDisplay(getRandomPhraseAsArray(phrases))

  for (const button of buttons) {
    button.className = ''
    button.disabled = false
  }
  for (const tries of heartTries) {
    tries.children[0].src = 'images/liveHeart.png'
  }
}
