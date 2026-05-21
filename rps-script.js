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
    return totalGames > 0 ? Math.round((this.wins / totalGames) * 100) : "0.00";
  },
  playerChoice: "",
  systemChoice: "",
  roundOutcome: "",
  selectionMade: false,
  roundResolved: false,
};

const gameContainer = document.querySelector("#game-container");
const playContainer = document.querySelector("#play-container");
const scoreboardContainer = document.querySelector("#scoreboard");
const gameChoices = document.querySelector("#selections");
const choiceButtons = document.querySelectorAll(".choice-btn");
const playBtn = document.querySelector("#play-btn");
const resetBtn = document.querySelector("#reset-btn");
const endBtn = document.querySelector("#end-btn");
const messageTextP = document.querySelector("#message-text");
const roundDisplaySpan = document.querySelector("#current-round");
const scoreboardSpans = {
  wins: document.querySelector("#wins"),
  losses: document.querySelector("#losses"),
  ties: document.querySelector("#ties"),
  winPct: document.querySelector("#win-pct"),
};

//=============================
// GAME PLAY
//=============================

gameChoices.addEventListener("click", logPlayerChoice);

playBtn.addEventListener("click", () => {
  generateSystemChoice();
  playRound(gameState.playerChoice, gameState.systemChoice);
  updateScoreboard();
});

resetBtn.addEventListener("click", resetRound);

endBtn.addEventListener("click", endGame);

//=============================
// FUNCTIONS
//=============================

function generateSystemChoice(event) {
  const options = ["r", "p", "s"];
  let systemInput = options[Math.floor(Math.random() * options.length)];
  gameState.systemChoice = systemInput;
  console.log(`System choice generated: ${gameState.systemChoice}`);
}

function logPlayerChoice(event) {
  gameState.playerChoice = event.target.id;
  gameState.selectionMade = true;
  playBtn.classList.remove("hidden");
  choiceButtons.forEach((btn) => {
    btn.classList.remove("selected");
  });
  event.target.classList.add("selected");
  UpdateMessageText();
  console.log(
    `Player choice logged: ${gameState.playerChoice}. Selection made: ${gameState.selectionMade}. Round resolved: ${gameState.roundResolved}.`,
  );
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
  gameState.roundResolved = true;
  playBtn.classList.add("hidden");
  resetBtn.classList.remove("hidden");
  UpdateMessageText();
  console.log(
    `Round played. Score updated. Outcome: ${gameState.roundOutcome}. Selection made: ${gameState.selectionMade}. Round resolved: ${gameState.roundResolved}.`,
  );
}

function resetRound(event) {
  gameState.roundNumber++;
  roundDisplaySpan.textContent = gameState.roundNumber;
  gameState.playerChoice = "";
  gameState.systemChoice = "";
  gameState.roundOutcome = "";
  gameState.selectionMade = false;
  gameState.roundResolved = false;
  playBtn.classList.add("hidden");
  resetBtn.classList.add("hidden");
  choiceButtons.forEach((btn) => {
    btn.classList.remove("selected");
  });
  UpdateMessageText();
  console.log(
    `Round reset. Selection made: ${gameState.selectionMade}. Round resolved: ${gameState.roundResolved}.`,
  );
}

function endGame(event) {
  messageTextP.textContent = `GAME OVER
  Final Score:
  Wins: ${gameState.wins}
  Losses: ${gameState.losses}
  Ties: ${gameState.ties}
  To play again, just refresh the page.`;
  gameContainer.classList.add("hidden");
  scoreboardContainer.classList.add("hidden");
  console.log("Game ended.");
  console.log(gameState);
}

function UpdateMessageText() {
  if (gameState.selectionMade === true && gameState.roundResolved === false) {
    messageTextP.textContent = "Click Play.";
  } else if (
    gameState.selectionMade === true &&
    gameState.roundResolved === true
  ) {
    messageTextP.textContent = `You chose ${choiceDisplay.get(gameState.playerChoice)}. I chose ${choiceDisplay.get(gameState.systemChoice)}. ${resultDisplay.get(gameState.roundOutcome)}`;
  } else {
    messageTextP.textContent = "Please make a selection to play.";
  }
}

function updateScoreboard() {
  scoreboardSpans.wins.textContent = gameState.wins;
  scoreboardSpans.losses.textContent = gameState.losses;
  scoreboardSpans.ties.textContent = gameState.ties;
  scoreboardSpans.winPct.textContent = gameState.winPct;
}
