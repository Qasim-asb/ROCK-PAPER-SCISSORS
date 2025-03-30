import { triggerCelebration } from "./celebration.js";

const choices = document.querySelectorAll(".choice-btn");
const playerScore = document.querySelector("#player");
const computerScore = document.querySelector("#computer");
const resetBtn = document.querySelector("#resetBtn");
const resultMsg = document.querySelector("#results-msg");
const winnerMsg = document.querySelector("#winner-msg");
const choiceContainer = document.querySelector(".choice-container")
const totalWins = document.querySelector("#total-wins");

const createScoreObject = (totalWins) => {
  return {
    player: 0,
    computer: 0,
    totalWins,
    resultMsg: "Play your move",
    winnerMsg: "",
    resetBtnText: "Reset Game"
  }
};

let score = JSON.parse(localStorage.getItem("score")) || createScoreObject(0);

function updateUI() {
  playerScore.innerText = score.player;
  computerScore.innerText = score.computer;
  totalWins.innerText = score.totalWins;
  resultMsg.innerText = score.resultMsg;
  winnerMsg.innerText = score.winnerMsg;
  resetBtn.innerText = score.resetBtnText;
  winnerMsg.style.display = score.winnerMsg ? "block" : "none";
  choiceContainer.style.display = (score.player === 3 || score.computer === 3) ? "none" : "block";
};

updateUI();

resetBtn.addEventListener("click", () => {
  
  if (resetBtn.innerText === "Reset Game") {
    score = createScoreObject(0);
    localStorage.removeItem("score");
  } else {
    score = createScoreObject(score.totalWins);
    localStorage.setItem("score", JSON.stringify(score));
  }

  updateUI();
});

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * 3)];
};

const drawGame = (playerChoice) => {
  score.resultMsg = `It's a tie! Both chose ${playerChoice}! Play again`;
  localStorage.setItem("score", JSON.stringify(score));
  updateUI();
};

const showWinner = (playerWin, playerChoice, compChoice) => {
  if (playerWin) {
    score.player++;
    score.resultMsg = `You win! your ${playerChoice} beats ${compChoice}`;
  } else {
    score.computer++;
    score.resultMsg = `You lose! ${compChoice} beats your ${playerChoice}`;
  }

  if (score.player === 3) {
    score.totalWins++;
    triggerCelebration();
  }

  if (score.player === 3 || score.computer === 3) {
    score.winnerMsg = `${score.player === 3 ? "You have" : "Computer has"} won the game!`;
    score.resetBtnText = "Play again?";
    choiceContainer.style.display = "none";
  }

  localStorage.setItem("score", JSON.stringify(score));
  updateUI();
};

const playGame = (playerChoice) => {
  const compChoice = genCompChoice();

  if (playerChoice === compChoice) {
    drawGame(playerChoice);
  } else {
    let playerWin = true;
    if (playerChoice === "rock") {
      playerWin = compChoice === "paper" ? false : true;
    } else if (playerChoice === "paper") {
      playerWin = compChoice === "scissors" ? false : true;
    } else {
      playerWin = compChoice === "rock" ? false : true;
    }
    showWinner(playerWin, playerChoice, compChoice);
  }
};

choices.forEach(choice => {
  choice.addEventListener("click", () => {
    const playerChoice = choice.getAttribute("id");
    playGame(playerChoice);
  })
});

document.body.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();

  switch (key) {
    case "r":
      playGame("rock");
      break;
    case "p":
      playGame("paper");
      break;
    case "s":
      playGame("scissors");
      break;
  }
});