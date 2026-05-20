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

const gameChoices = document.querySelector("#selections");
const playBtn = document.querySelector("#play-btn");
const endBtn = document.querySelector("#end-btn");
const roundDisplaySpan = document.querySelector("#current-round");
const playerChoiceSpan = document.querySelector("#player-display");
const systemChoiceSpan = document.querySelector("#system-display");
const outcomeDisplaySpan = document.querySelector("#outcome-display");
const endMessageP = document.querySelector("#end-message");

gameChoices.addEventListener("click", logPlayerChoice);

playBtn.addEventListener("click", () => {
  generateSystemChoice();
  playRound(gameState.playerChoice, gameState.systemChoice);
  displayOutcome();
  gameState.roundNumber++;
  roundDisplaySpan.textContent = gameState.roundNumber;
});

endBtn.addEventListener("click", endGame);

//=============================
// FUNCTIONS
//=============================

function generateSystemChoice(event) {
  const options = ["r", "p", "s"];
  let systemInput = options[Math.floor(Math.random() * options.length)];
  gameState.systemChoice = systemInput;
}

function logPlayerChoice(event) {
  gameState.playerChoice = event.target.id;
}

function displayOutcome(event) {
  systemChoiceSpan.textContent = choiceDisplay.get(gameState.systemChoice);
  playerChoiceSpan.textContent = choiceDisplay.get(gameState.playerChoice);
  outcomeDisplaySpan.textContent = resultDisplay.get(gameState.roundOutcome);
  console.log(gameState);
}

function playRound(playerInput, systemInput) {
  if (playerInput === systemInput) {
    gameState.roundOutcome = "t";
    gameState.ties++;
  } else if (
    (playerInput === "r" && systemInput === "s") ||
    (playerInput === "p" && systemInput === "r") ||
    (playerInput === "s" && systemInput === "p")
  ) {
    gameState.roundOutcome = "w";
    gameState.wins++;
  } else {
    gameState.roundOutcome = "l";
    gameState.losses++;
  }
}

function endGame(event) {
  endMessageP.textContent = `Thanks for playing!`;
  gameState.roundNumber = 1;
  gameState.wins = 0;
  gameState.losses = 0;
  gameState.ties = 0;
  gameState.playerChoice = "";
  gameState.systemChoice = "";
  gameState.roundOutcome = "";
  console.log(gameState);
}
