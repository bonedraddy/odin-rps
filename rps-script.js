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
  get winPct() {
    const totalGames = this.wins + this.losses + this.ties;
    return totalGames > 0 ? Math.round((this.wins / totalGames) * 100) : "0";
  },
  playerChoice: "",
  systemChoice: "",
  roundOutcome: "",
  selectionMade: false,
  roundResolved: false,
};

//=============================
// DOM ELEMENTS
//=============================

// Containers
const gameContainer = document.querySelector("#game-container");
const buttonsContainer = document.querySelector(".buttons-container");
const choicesContainer = document.querySelector("#selections");
const scoreboardContainer = document.querySelector("#scoreboard");

// Buttons
const choiceButtons = document.querySelectorAll(".choice-btn");
const submitBtn = document.querySelector("#submit");
const resetBtn = document.querySelector("#reset");
const endBtn = document.querySelector("#end");

// Displays
const roundDisplaySpan = document.querySelector("#round-value");
const displayMessage = document.querySelector("#message-text");
const scoreboardSpans = {
  wins: document.querySelector("#wins"),
  losses: document.querySelector("#losses"),
  ties: document.querySelector("#ties"),
  winPct: document.querySelector("#win-pct"),
};

//=============================
// EVENT LISTENERS
//=============================

choicesContainer.addEventListener("click", logPlayerChoice);

submitBtn.addEventListener("click", () => {
  generateSystemChoice();
  playRound(gameState.playerChoice, gameState.systemChoice);
  updateScoreboard();
});

resetBtn.addEventListener("click", resetRound);

endBtn.addEventListener("click", endGame);

// Initial UI State
updateDisplayMessage();
updateScoreboard();

//=============================
// FUNCTIONS
//=============================

function generateSystemChoice(event) {
  const options = ["r", "p", "s"];
  const systemInput = options[Math.floor(Math.random() * options.length)];
  gameState.systemChoice = systemInput;
  console.log(`System choice generated: ${gameState.systemChoice}`);
}

function logPlayerChoice(event) {
  if (!event.target.classList.contains("choice-btn")) return;

  gameState.playerChoice = event.target.id;
  gameState.selectionMade = true;
  gameState.roundResolved = false;
  submitBtn.classList.remove("hidden");
  choiceButtons.forEach((btn) => btn.classList.remove("selected"));
  event.target.classList.add("selected");
  updateDisplayMessage();
  console.log(
    `Player choice logged: ${gameState.playerChoice}. Selection made: ${gameState.selectionMade}. Round resolved: ${gameState.roundResolved}.`,
  );
}

function playRound(playerInput, systemInput) {
  if (!gameState.selectionMade || gameState.roundResolved) return;
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
  gameState.roundResolved = true;
  submitBtn.classList.add("hidden");
  resetBtn.classList.remove("hidden");
  updateDisplayMessage();
  console.log(
    `Round played. Score updated. Outcome: ${gameState.roundOutcome}. Selection made: ${gameState.selectionMade}. Round resolved: ${gameState.roundResolved}.`,
  );
}

function resetRound(event) {
  gameState.roundNumber++;
  gameState.playerChoice = "";
  gameState.systemChoice = "";
  gameState.roundOutcome = "";
  gameState.selectionMade = false;
  gameState.roundResolved = false;
  roundDisplaySpan.textContent = gameState.roundNumber;
  submitBtn.classList.add("hidden");
  resetBtn.classList.add("hidden");
  choiceButtons.forEach((btn) => btn.classList.remove("selected"));
  updateDisplayMessage();
  console.log(
    `Round reset. Selection made: ${gameState.selectionMade}. Round resolved: ${gameState.roundResolved}.`,
  );
}

function endGame(event) {
  displayMessage.textContent = `GAME OVER
  Final Score:
  Total Rounds: ${gameState.roundNumber - 1}
  W/D/L: ${gameState.wins}/${gameState.ties}/${gameState.losses}
  Win Pct: ${gameState.winPct}%
  See you next time!
  Refresh the page to play again.`;
  scoreboardSpans.wins.textContent = 0;
  scoreboardSpans.losses.textContent = 0;
  scoreboardSpans.ties.textContent = 0;
  scoreboardSpans.winPct.textContent = 0;
  buttonsContainer.classList.add("hidden");
  console.log("Game ended.");
  console.log(gameState);
}

function updateDisplayMessage() {
  if (gameState.selectionMade === true && gameState.roundResolved === false) {
    displayMessage.textContent = "Click Submit.";
  } else if (
    gameState.selectionMade === true &&
    gameState.roundResolved === true
  ) {
    displayMessage.textContent = `You chose ${choiceDisplay.get(
      gameState.playerChoice,
    )}. I chose ${choiceDisplay.get(
      gameState.systemChoice,
    )}. ${resultDisplay.get(gameState.roundOutcome)}`;
  } else {
    displayMessage.textContent = "Please make a selection to play.";
  }
}

function updateScoreboard() {
  scoreboardSpans.wins.textContent = gameState.wins;
  scoreboardSpans.losses.textContent = gameState.losses;
  scoreboardSpans.ties.textContent = gameState.ties;
  scoreboardSpans.winPct.textContent = gameState.winPct;
}
