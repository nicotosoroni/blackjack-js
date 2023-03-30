/*
2C = Two of Clubs
2D = Two of Diamonds
2H = Two of Hearts
2S = Two of Spades
*/

let deck = [];
const types = ['C', 'D', 'H', 'S'];
const special = ['A', 'J', 'Q', 'K'];

let playerPoints = 0;
let computerPoints = 0;

//Referencias al HTML

const btnGet = document.querySelector('#btnGet');
const displayPP = document.querySelectorAll('small');
const playerCards = document.querySelector('#playerCards');

function fyShuffle(a) {
  let i = a.length;
  while (--i > 0) {
    let rdm = Math.floor(Math.random() * (i + 1));
    [a[rdm], a[i]] = [a[i], a[rdm]];
  }
  return a;
}

const createDesk = () => {
  for (let i = 2; i <= 10; i++) {
    for (let type of types) {
      deck.push(i + type);
    }
  }
  for (let type of types) {
    for (let es of special) {
      deck.push(es + type);
    }
  }
  deck = fyShuffle(deck);
  return deck;
};

createDesk();

//lib undescore para mezclar

const requestCard = () => {
  // tengo que sacar la carta del deck
  if (deck.length === 0) {
    throw 'No hay cartas en el deck';
  }
  const card = deck.shift();
  return card;
};

const cardValue = (card) => {
  // let value
  // if (card.length === 2){
  //   value = card[0]
  // }else{
  //   value = card[0] + card[1]
  // }
  const value = card.substring(0, card.length - 1);
  return isNaN(value)
    ? (points = value === 'A' ? 11 : 10)
    : (points = parseInt(value));
};

cardValue('2D');

// Enventos

btnGet.addEventListener('click', () => {
  const card = requestCard();
  playerPoints += cardValue(card);
  displayPP[0].innerText = playerPoints;

  const newCard = document.createElement('img');
  newCard.classList.add('carta');
  newCard.src = `assets/cartas/${card}.png`;
  playerCards.append(newCard);

  if (playerPoints > 21) {
    btnGet.disabled = true;
  }
});
