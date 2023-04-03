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
let compPoints = 0;

//Referencias al HTML

const btnGet = document.querySelector('#btnGet');
const btnStop = document.querySelector('#btnStop');
const btnNew = document.querySelector('#btnNew');
const displayP = document.querySelectorAll('small');
const playerCards = document.querySelector('#playerCards');
const compCards = document.querySelector('#compCards');

function fyShuffle(a) {
  let i = a.length;
  while (--i > 0) {
    let rdm = Math.floor(Math.random() * (i + 1));
    [a[rdm], a[i]] = [a[i], a[rdm]];
  }
  return a;
}

const createDesk = () => {
  deck = [];
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

// computer turn

const compTurn = (pointsToBeat) => {
  do {
    const card = requestCard();
    compPoints += cardValue(card);
    displayP[1].innerText = compPoints;

    const newCard = document.createElement('img');
    newCard.classList.add('carta');
    newCard.src = `assets/cartas/${card}.png`;
    compCards.append(newCard);
    if (playerPoints > 21) break;
  } while (pointsToBeat >= compPoints && pointsToBeat <= 21);
  if ((playerPoints > compPoints && playerPoints <= 21) || compPoints > 21) {
    showResult('Player');
  } else if (
    (playerPoints < compPoints && compPoints <= 21) ||
    playerPoints > 21
  ) {
    showResult('Computer');
  } else {
    showResult('Nobody');
  }
};

const showResult = (winner) => {
  const result = document.createElement('div');
  result.classList.add('result');
  result.innerHTML += `
  <p>${winner} won!</p>
  `;
  document.body.append(result);
};

// Enventos

btnGet.addEventListener('click', () => {
  const card = requestCard();
  playerPoints += cardValue(card);
  displayP[0].innerText = playerPoints;

  const newCard = document.createElement('img');
  newCard.classList.add('carta');
  newCard.src = `assets/cartas/${card}.png`;
  playerCards.append(newCard);

  if (playerPoints > 21) {
    btnGet.disabled = true;
    btnStop.disabled = true;
    compTurn(playerPoints);
  }
});

btnStop.addEventListener('click', () => {
  btnGet.disabled = true;
  btnStop.disabled = true;
  compTurn(playerPoints);
});

btnNew.addEventListener('click', () => {
  createDesk();
  console.log(deck);
  playerPoints = 0;
  compPoints = 0;
  displayP[0].innerText = 0;
  displayP[1].innerText = 0;
  playerCards.innerHTML = '';
  compCards.innerHTML = '';
  compCards.innerHTML = '';
  btnGet.disabled = false;
  btnStop.disabled = false;
  document.body.removeChild(document.querySelector('.result'));
});
