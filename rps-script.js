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
  selectionMade: false,
  roundResolved: false,
};

const gameChoices = document.querySelector("#selections");
const playBtn = document.querySelector("#play-btn");
const resetBtn = document.querySelector("#reset-btn");
const endBtn = document.querySelector("#end-btn");
const messageTextP = document.querySelector("#message-text");
const roundDisplaySpan = document.querySelector("#current-round");
const endMessageP = document.querySelector("#end-message");

//=============================
// GAME PLAY
//=============================

gameChoices.addEventListener("click", logPlayerChoice);

playBtn.addEventListener("click", () => {
  generateSystemChoice();
  playRound(gameState.playerChoice, gameState.systemChoice);
});

resetBtn.addEventListener("click", () => {
  resetRound();
});

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
    `Round played. Outcome: ${gameState.roundOutcome}. Selection made: ${gameState.selectionMade}. Round resolved: ${gameState.roundResolved}.`,
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
  UpdateMessageText();
  console.log(
    `Round reset. Selection made: ${gameState.selectionMade}. Round resolved: ${gameState.roundResolved}.`,
  );
}

function endGame(event) {
  endMessageP.textContent = `Thanks for playing! To play again, just refresh the page.`;
  gameState.roundNumber = 1;
  gameState.wins = 0;
  gameState.losses = 0;
  gameState.ties = 0;
  gameState.playerChoice = "";
  gameState.systemChoice = "";
  gameState.roundOutcome = "";
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
