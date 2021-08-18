'use script';

let scores, currentScore, activePlayer, isGameon;

// getting the elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const overlayEl = document.querySelector('.player--active');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// initial

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isGameon = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player-winner');
  player1El.classList.remove('player-active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// rolling the dice
btnRoll.addEventListener('click', function () {
  // generate a random dice roll
  if (isGameon) {
    const choice = Math.floor(Math.random() * 6 + 1);

    // display the dice accordingly
    diceEl.src = `dice-${choice}.png`;
    diceEl.classList.remove('hidden');

    //check if the choice is 1, if so switch player, else add dice roll to current score
    if (choice !== 1) {
      currentScore += choice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// holding the score
btnHold.addEventListener('click', function () {
  if (isGameon) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      isGameon = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

//resetting the game
btnNew.addEventListener('click', init);
