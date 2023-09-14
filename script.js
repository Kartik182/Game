"use strict";
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const newBtn = document.querySelector(".btn--new");
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
let score = [0, 0];
let active = 0;
let currentPlayer = document.querySelector(`#current--${active}`);
let playing = true;

score0El.textContent = 0;
score1El.textContent = 0;
let currentScore = 0;
diceEl.classList.add("hidden");

rollBtn.addEventListener("click", function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${active}`).textContent = currentScore;
    } else {
      player0El.classList.toggle("player--active");
      player1El.classList.toggle("player--active");
      document.querySelector(`#current--${active}`).textContent = 0;
      currentScore = 0;
      active = active === 1 ? 0 : 1;
    }
  }
});
holdBtn.addEventListener("click", function () {
  if (playing) {
    score[active] += currentScore;
    if (score[active] >= 100) {
      diceEl.classList.add("hidden");
      playing = false;
      if (player1El.classList.contains("player--active")) {
        player1El.classList.add("player--winner");
      } else {
        player0El.classList.add("player--winner");
      }
    } else {
      player0El.classList.toggle("player--active");
      player1El.classList.toggle("player--active");
      currentScore = 0;
      document.querySelector(`#current--${active}`).textContent = currentScore;
      let condition = active === 0 ? score0El : score1El;
      condition.textContent = score[active];
      active = active === 1 ? 0 : 1;
    }
  }
});

newBtn.addEventListener("click", function () {
  score[0] = 0;
  score[1] = 0;
  active = 0;
  currentScore = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  playing = true;
  player1El.classList.remove("player--winner");
  player0El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  document.querySelector("#current--0").textContent = 0;
  document.querySelector("#current--1").textContent = 0;
});
