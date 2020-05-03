const ROCK = 0;  // Rock index
const PAPER = 1;  // Paper index
const SCISSORS = 2;  // Scissors index

// Fights winner
const WINNING_MATRIX = [
    [null, PAPER, ROCK],
    [PAPER, null, SCISSORS],
    [ROCK, SCISSORS, null]
];

// Choice to string table (0 = Rock, 1 = Paper, 2 = Scissors)
const CHOICE_TO_STRING = ["Rock", "Paper", "Scissors"]

function userPlay(message="Rock, Paper or Scissors?") {
    // Ask user for his choice
    let userChoice = prompt(message);

    // Clean and return user input
    userChoice = userChoice.toLowerCase();
    if (userChoice === "rock") {
        return ROCK;
    }
    else if (userChoice === "paper") {
        return PAPER;
    }
    else if (userChoice === "scissors") {
        return SCISSORS;
    }
    else {
        return userPlay("Please enter a valid choice. Rock, Paper or Scissors?");
    }
}

function computerPlay() {
    // Return a random number between 0 and 2 (included)
    return Math.floor(Math.random() * 3);
}

function play(userChoice, computerChoice) {
    // Return winner
    if (WINNING_MATRIX[userChoice][computerChoice] === userChoice) {
        return "USER";
    }
    else if (WINNING_MATRIX[userChoice][computerChoice] === computerChoice) {
        return "COMPUTER";
    }
    else {
        return "NOBODY";
    }
}

function game() {
    // Welcome message
    console.log("Let's play Rock, Paper, Scissors in 5 rounds.");

    // Play 5 times
    let userWins = 0, computerWins = 0;
    for (i = 0; i < 5; i++) {
        // Prompt user and computer for their choices
        userChoice = userPlay();
        computerChoice = computerPlay();

        // Log choices
        console.log(`User choice: ${CHOICE_TO_STRING[userChoice]}`);
        console.log(`Computer choice: ${CHOICE_TO_STRING[computerChoice]}`);

        // Play round
        winner = play(userChoice, computerChoice);

        // Save scores and log round winner
        if (winner === "USER") {
            userWins++;
            console.log("User wins!");
        }
        else if (winner === "COMPUTER") {
            computerWins++;
            console.log("Computer wins!");
        }
        else {
            console.log("Nobody wins...");
        }
    }

    // Log global winner
    let score = `User ${userWins} - ${computerWins} Computer`;
    if (userWins > computerWins) {
        console.log(`User wins the game! (${score})`);
    }
    else if (computerWins > userWins) {
        console.log(`Computer wins the game! (${score})`);
    }
    else {
        console.log(`Nobody wins the game... (${score})`);
    }
}