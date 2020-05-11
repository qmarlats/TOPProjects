class Player {
    constructor(id, name, type="HUMAN") {
        // Initialize defaults
        this.DEFAULT_CHOICE = "pending";
        this.DEFAULT_SCORE = 0;

        // Initialize outputs
        this.nameOutput = document.querySelector(`#player-${id}-name`);
        this.choiceOutput = document.querySelector(`#player-${id}-choice`);
        this.scoreOutput = document.querySelector(`#player-${id}-score`);

        // Initialize user information
        this.id = id;
        this.name = name;
        this.type = type;
        this.choice = this.DEFAULT_CHOICE;
        this.score = this.DEFAULT_SCORE;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;

        // Refresh output
        this.nameOutput.textContent = this.name;
    }

    get choice() {
        return this._choice;
    }

    set choice(choice) {
        const choices = ["rock", "paper", "scissors", "pending", "error"];

        this._choice = choices.includes(choice) ? choice : "error";

        // Refresh output
        this.choiceOutput.classList.remove(...choices);
        this.choiceOutput.classList.add(this.choice);
    }

    get score() {
        return this._score;
    }

    set score(score) {
        this._score = score;

        // Refresh output
        this.scoreOutput.textContent = this.score;
    }

    reset() {
        // Reset to defaults
        this.choice = this.DEFAULT_CHOICE;
        this.score = this.DEFAULT_SCORE;
    }

    setRandomChoice() {
        // Possible choices
        const choices = ["rock", "paper", "scissors"];

        // Set random choice
        this.choice = choices[Math.floor(Math.random() * 3)];
    }

    incrementScore(increment=1) {
        this.score += increment;
    }
}

class Round {
    constructor(...players) {
        // Initialize players
        this.players = players;

        // Initialize winner
        this.winner = null;
    }

    play() {
        // Map choices to indexes
        const choices = {rock: 0, paper: 1, scissors: 2};

        // Compute winner
        this.winner = this.players.reduce((a, b) => {
            const aChoice = choices[a.choice];
            const bChoice = choices[b.choice];
            const winnerMatrix = [
                [null, b, a],
                [a, null, b],
                [b, a, null]
            ];

            return winnerMatrix[aChoice][bChoice];
        });

        // Increment winner score
        if (this.winner) {
            this.winner.incrementScore();
        }  // else it's a draw
    }
}

class Game {
    constructor(...players) {
        // Initialize output
        this.winnerOutput = document.querySelector(`#winner-name`);

        // Initialize players
        this.players = players;
        this.players.forEach(player => player.reset());

        // Initialize game
        this.maximumScore = MAXIMUM_SCORE;
        this.round = new Round(...players);
        this.winner = null;
    }

    get firstPlayer() {
        return this.players[0];
    }

    get currentPlayer() {
        return this._currentPlayer || this.firstPlayer;
    }

    set currentPlayer(player) {
        this._currentPlayer = player;
    }

    get nextPlayer() {
        const currentPlayerIndex = this.players.indexOf(this.currentPlayer);
        const lastPlayerIndex = this.players.indexOf(this.lastPlayer);

        return (currentPlayerIndex < lastPlayerIndex)
            ? this.players[currentPlayerIndex + 1]
            : this.firstPlayer;
    }

    get lastPlayer() {
        return this.players[this.players.length - 1];
    }

    get maximumScoreReached() {
        return this.players.some(player => {
            return player.score === this.maximumScore;
        });
    }

    get winner() {
        return this._winner;
    }

    set winner(winner) {
        this._winner = winner;

        // Refresh output
        if (winner) {
            this.winnerOutput.textContent = `${this.winner.name} wins! `;

            const restartGame = document.createElement('span');
            restartGame.setAttribute('id', 'restart-game');
            restartGame.textContent = "Restart game?";
            this.winnerOutput.appendChild(restartGame);
        }
        else {
            this.winnerOutput.innerHTML = "";
        }
    }

    switchToNextPlayer() {
        this.currentPlayer = this.nextPlayer;
    }

    playRound(choice) {
        if (!this.maximumScoreReached) {
            switch (this.currentPlayer.type) {
                case "HUMAN":
                    this.currentPlayer.choice = choice;
                    break;
                case "COMPUTER":
                    this.currentPlayer.setRandomChoice();
                    break;
            }

            if (this.currentPlayer === this.lastPlayer) {
                this.round.play();
            }

            if (this.maximumScoreReached) {
                this.winner = this.round.winner;
            }
            else {
                this.switchToNextPlayer();

                if (this.currentPlayer.type === "COMPUTER") {
                    this.playRound();
                }
            }
        }
    }
}

// Default settings
const MAXIMUM_SCORE = 5;

// Players
let players = [
    new Player(1, "Human"),
    new Player(2, "Computer", "COMPUTER")
];

// Start new game
let game = new Game(...players);

// Play round
const actions = document.querySelectorAll('#actions button[name=action]');
actions.forEach(action => {
    action.addEventListener('click', () => {
        game.playRound(action.value);
    });
});

// Restart the game
document.addEventListener('click', element => {
    if (element.target.id === 'restart-game'){
        game = new Game(...players);
    }
});