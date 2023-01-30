let startButton = document.getElementById('start-button')
let gameArea = document.getElementById('game-area')
let scoreArea = document.getElementById('score-area')

startButton.addEventListener('click', runGame)

function runGame() {
    console.log("started");
    startButton.classList.add('hide');
    gameArea.classList.remove('hide');
    scoreArea.classList.remove('hide');
}

function nextQuestion() {

}

function selectAnswer() {

}