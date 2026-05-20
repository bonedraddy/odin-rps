//=============================
// GLOBAL CONSTS
//=============================
const choiceDisplay = new Map([
  ["r", "Rock"],
  ["p", "Paper"],
  ["s", "Scissors"],
]);

const resultDisplay = new Map([
  ["w", "You WIN! :D"],
  ["l", "You LOSE. :("],
  ["t", "We TIE. :|"],
]);

const gameState = {
  roundNumber: 1,
  wins: 0,
  losses: 0,
  ties: 0,
  playerChoice: "",
  systemChoice: "",
  roundOutcome: "",
};

//=============================
// GAME PLAY
//=============================
/*const rockBtn = document.querySelector("#r");
rockBtn.addEventListener("click", (event) => {
  let playerInput = event.target.id;
  gameState.playerChoice = playerInput;
  console.log(gameState.playerChoice);
});*/

const gameChoices = document.querySelector("#selections");
const playBtn = document.querySelector("#play-btn");
const playerChoiceSpan = document.querySelector("#player-display");
const systemChoiceSpan = document.querySelector("#system-display");
gameChoices.addEventListener("click", logPlayerChoice);
playBtn.addEventListener("click", generateSystemChoice);
//let gameChoices = document.querySelector("#selections");
//gameState.playerChoice = gameChoices.addEventListener("click", function (e) {
//  console.log(e.target);
//});

//console.log(gameState.playerChoice);
//let displayPlayerChoice = document.getElementById("player-display");
//displayPlayerChoice.textContent = choiceDisplay.get(gameState.playerChoice);
//let playBtn = document.querySelector("#play-btn");
//playBtn.addEventListener("click", systemChoiceGenerator);

//=============================
// FUNCTIONS
//=============================

function generateSystemChoice(event) {
  const options = ["r", "p", "s"];
  let systemInput = options[Math.floor(Math.random() * options.length)];
  gameState.systemChoice = systemInput;
  systemChoiceSpan.textContent = choiceDisplay.get(gameState.systemChoice);
  console.log(gameState.systemChoice);
}

function logPlayerChoice(event) {
  let playerInput = event.target.id;
  gameState.playerChoice = playerInput;
  playerChoiceSpan.textContent = choiceDisplay.get(gameState.playerChoice);
  console.log(gameState.playerChoice);
}

function playRound(playerInput, systemInput) {
  let outcome;
  if (playerInput === systemInput) {
    outcome = "t";
    gameState.ties++;
    return outcome;
  } else if (
    (playerInput === "r" && systemInput === "s") ||
    (playerInput === "p" && systemInput === "r") ||
    (playerInput === "s" && systemInput === "p")
  ) {
    outcome = "w";
    gameState.wins++;
    return outcome;
  } else {
    outcome = "l";
    gameState.losses++;
    return outcome;
  }
}
