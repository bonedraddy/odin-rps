//=============================
// GLOBAL CONSTS
//=============================
const prompt = require("prompt-sync")();
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
// GAMEPLAY
//=============================
const playerName = prompt(`Hi there. I'm RPSBot. What is your name? `);
const inviteResponse = askYesNo(
  `Welcome, ${playerName}! Would you like to play Rock, Paper, Scissors? (y/n) `,
);

if (inviteResponse === "y") {
  gameState.playerChoice = getPlayerChoice();
  gameState.systemChoice = systemChoiceGenerator();
  gameState.roundOutcome = playRound(
    gameState.playerChoice,
    gameState.systemChoice,
  );
  console.log(roundMessage());
  let playAgain = askYesNo(`Would you like to play again? (y/n) `);

  while (playAgain === "y") {
    gameState.roundNumber++;
    gameState.playerChoice = getPlayerChoice();
    gameState.systemChoice = systemChoiceGenerator();
    gameState.roundOutcome = playRound(
      gameState.playerChoice,
      gameState.systemChoice,
    );
    console.log(roundMessage());
    playAgain = askYesNo(`Would you like to play again? (y/n) `);
  }

  console.log(finalMessage());
} else {
  console.log("Okay. Maybe another time.");
}

//--------------------------------------------
//HELPER FUNCTIONS

function normalizeInput(response) {
  return response.slice(0, 1).toLowerCase();
}

function validateYesNo(response) {
  return response === "y" || response === "n";
}

function validateRPS(response) {
  return response === "r" || response === "p" || response === "s";
}

function systemChoiceGenerator() {
  const options = ["r", "p", "s"];
  return options[Math.floor(Math.random() * options.length)];
}

function roundMessage() {
  return `This was Round ${gameState.roundNumber}. You chose ${choiceDisplay.get(gameState.playerChoice)}. I chose ${choiceDisplay.get(gameState.systemChoice)}. ${resultDisplay.get(gameState.roundOutcome)}`;
}

function finalMessage() {
  return `Okay. Here are the final results:
    Rounds Played: ${gameState.roundNumber}
    Wins: ${gameState.wins}
    Losses: ${gameState.losses}
    Ties: ${gameState.ties}
    Thanks for playing! See you again soon.`;
}

//--------------------------------------------
//GAME FUNCTIONS

function askYesNo(question) {
  let response = normalizeInput(prompt(question));

  while (!validateYesNo(response)) {
    response = normalizeInput(
      prompt(`Invalid input. Please answer "Yes" or "No". `),
    );
  }

  return response;
}

function getPlayerChoice() {
  let response = normalizeInput(
    prompt(`Great! Make your selection now. (r/p/s) `),
  );

  while (!validateRPS(response)) {
    response = normalizeInput(
      prompt(`Invalid input. Please answer "r", "p", or "s". `),
    );
  }

  return response;
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
