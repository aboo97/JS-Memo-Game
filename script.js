// script.js

const symbols = ['🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐼', '🐨'];
let cards = [];
let openedCards = [];
let matchedCards = [];
let canFlip = true;

// Function to create the card elements
function createCards() {
  for (let i = 0; i < symbols.length; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbols[i];
    card.addEventListener('click', flipCard);
    cards.push(card);
    cards.push(card.cloneNode(true));
  }

  shuffleCards(cards);

  const cardsContainer = document.getElementById('cards');
  cards.forEach(card => {
    cardsContainer.appendChild(card);
  });
}

// Function to shuffle the cards using Fisher-Yates algorithm
function shuffleCards(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Function to handle card flipping
function flipCard() {
  if (!canFlip) return;

  const card = this;
  if (card === openedCards[0]) return;

  card.textContent = card.dataset.symbol;
  card.classList.add('hidden');

  if (openedCards.length === 0) {
    openedCards.push(card);
  } else if (openedCards.length === 1) {
    openedCards.push(card);
    canFlip = false;
    setTimeout(checkMatch, 1000);
  }
}

// Function to check if the opened cards match
function checkMatch() {
  const [card1, card2] = openedCards;

  if (card1.dataset.symbol === card2.dataset.symbol) {
    card1.removeEventListener('click', flipCard);
    card2.removeEventListener('click', flipCard);
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards.push(card1, card2);
    checkWin();
  } else {
    card1.textContent = '';
    card2.textContent = '';
    card1.classList.remove('hidden');
    card2.classList.remove('hidden');
  }

  openedCards = [];
  canFlip = true;
}

// Function to check if all cards have been matched
function checkWin() {
  if (matchedCards.length === cards.length) {
    setTimeout(() => {
      alert('Congratulations! You won the game!');
      resetGame();
    }, 500);
  }
}

// Function to reset the game
function resetGame() {
  const cardsContainer = document.getElementById('cards');
  cardsContainer.innerHTML = '';
  cards = [];
  openedCards = [];
  matchedCards = [];
  canFlip = true;
  createCards();
}

// Initialize the game
createCards();
