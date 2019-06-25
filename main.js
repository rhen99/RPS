const choices = document.querySelectorAll(".choice");
const visual = document.querySelector(".visual");
const playerScore = document.querySelector("#playerScore");
const comScore = document.querySelector("#comScore");
const restartBtn = document.querySelector("#restart");
const scoreboard = {
	player: 0,
	computer: 0,
};
let isLoading = false;

function getComputerChoice() {
	const rand = Math.ceil(Math.random() * 9);
	if (rand) {
		if (rand < 3) {
			return "rock";
		} else if (rand < 6) {
			return "paper";
		} else {
			return "scissors";
		}
	}
}

function play(e) {
	restartBtn.style.display = "inline-block";
	const playerChoice = e.target.id;
	const computerChoice = getComputerChoice();
	const winner = getWinner(playerChoice, computerChoice);
	isLoading = true;
	loading();
	setTimeout(() => showWinner(winner, playerChoice, computerChoice), 2000);
}
function getWinner(p, c) {
	if (p === c) {
		return "draw";
	} else if (p === "rock") {
		if (c === "paper") {
			return "computer";
		} else {
			return "player";
		}
	} else if (p === "paper") {
		if (c === "scissors") {
			return "computer";
		} else {
			return "player";
		}
	} else if (p === "scissors") {
		if (c === "rock") {
			return "computer";
		} else {
			return "player";
		}
	}
}
function showWinner(winner, playerChoice, computerChoice) {
	isLoading = false;
	if (winner === "player") {
		scoreboard.player++;
		visual.innerHTML = `
        <div class="playerChoice result">
					<span><i class="fas fa-hand-${playerChoice} fa-10x"></i></span>
					<p id="playerResult">You Win</p>
				</div>
				<div class="comChoice result">
					<span><i class="fas fa-hand-${computerChoice} fa-10x"></i></span>
					<p class="comResult">You Lose</p>
				</div>
        `;
		playerScore.innerHTML = scoreboard.player;
	} else if (winner === "computer") {
		scoreboard.computer++;
		visual.innerHTML = `
        <div class="playerChoice result">
					<span><i class="fas fa-hand-${playerChoice} fa-10x"></i></span>
					<p id="playerResult">You Lose</p>
				</div>
				<div class="comChoice result">
					<span><i class="fas fa-hand-${computerChoice} fa-10x"></i></span>
					<p class="comResult">You Win</p>
				</div>
        `;
		comScore.innerHTML = scoreboard.computer;
	} else {
		visual.innerHTML = `
        <div class="playerChoice result">
					<span><i class="fas fa-hand-${playerChoice} fa-10x"></i></span>
					<p id="playerResult">Draw</p>
				</div>
				<div class="comChoice result">
					<span><i class="fas fa-hand-${computerChoice} fa-10x"></i></span>
					<p class="comResult">Draw</p>
				</div>
        `;
	}
}
function restartGame() {
	scoreboard.player = 0;
	scoreboard.computer = 0;
	visual.innerHTML = "";
	playerScore.innerHTML = "0";
	comScore.innerHTML = "0";
	restartBtn.style.display = "none";
}
function loading() {
	if (isLoading) {
		visual.innerHTML = `<p>Rock!!! Paper!!! Scissors</p>`;
	}
	return;
}
choices.forEach(choice => {
	choice.addEventListener("click", play);
});
restartBtn.addEventListener("click", restartGame);
