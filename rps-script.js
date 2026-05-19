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
// FUNCTIONS
//=============================
function systemChoiceGenerator() {
  const options = ["r", "p", "s"];
  return options[Math.floor(Math.random() * options.length)];
}
