// global variables called in many different functions

let startButton = document.getElementById('start-button')
let nextButton = document.getElementById('next-button')
let gameArea = document.getElementById('game-area')
let scoreArea = document.getElementById('score-area')
let rulesButton = document.getElementById('rules-button')
let rulesDiv = document.getElementById('rules');

let startFromRules = document.getElementById('start-from-rules');
let showScoreButton = document.getElementById('show-score-button');
let questionElement = document.getElementById('question');
let answerButtonsElement = document.getElementById('answer-buttons');

let currentQuestionIndex;

// event listeners to trigger funtions when buttons clicked

startButton.addEventListener('click', runGame);
rulesButton.addEventListener('click', showRules);
startFromRules.addEventListener('click', runGame);
showScoreButton.addEventListener('click', () => {
    showScore()
    finishGame()
  });
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    nextQuestion()
  });

// runs game when start button is clicked

function runGame() {
    console.log("started");
    startButton.classList.add('hide');
    gameArea.classList.remove('hide');
    scoreArea.classList.remove('hide');
    rulesButton.classList.add('hide');
    showScoreButton.classList.add('hide');
    rulesDiv.classList.add('hide');
    currentQuestionIndex = 0
    nextQuestion();
    resetScore();
}

// finishes game after last question and returns user to home screen

function finishGame() {
    console.log("Game over");
    startButton.classList.remove('hide');
    gameArea.classList.add('hide');
    scoreArea.classList.add('hide');
    rulesButton.classList.remove('hide');
    showScoreButton.classList.add('hide');
    rulesDiv.classList.add('hide');
    currentQuestionIndex = 0
    clearStatusClass(document.body)
    resetScore();
}

// shows rules div when button is clicked

function showRules() {
    rulesDiv.classList.remove('hide');
}

// calls next question 

function nextQuestion() {
    resetQuiz()
    showQuestion(questions[currentQuestionIndex])
}

// shows next question and clears previous question answers

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
          button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
      })
}

// gives answer when user clicks a button, increments correct or incorrect score

function selectAnswer(e) {
    let selectedButton = e.target;
    let correct = selectedButton.dataset.correct
    let showScore = document.getElementById('show-score-button');
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct)
    })

    if (questions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide')
    } else {
      startButton.classList.add('hide')
      showScore.classList.remove('hide')

    }
    
    if (correct) {
        incrementScore();
    } else {
        incrementWrongAnswer();
    }
  }

//   show alert with different message depending on user score

function showScore() {
    let correctAnswerScore = document.getElementById('score').innerText;
    let incorrectAnswerScore = document.getElementById('incorrect').innerText;

    if (parseInt(correctAnswerScore) + parseInt(incorrectAnswerScore) === 10 && parseInt(correctAnswerScore) === 10) {
        alert(`Congratulations! Top of the league! You scored ${correctAnswerScore} out of 10. You're a Premier Legaue Quiz Master!`);
    }

    else if (parseInt(correctAnswerScore) + parseInt(incorrectAnswerScore) === 10 && parseInt(correctAnswerScore) > 7 && parseInt(correctAnswerScore) < 10) {
        alert(`Congratulations! You finished top 4! You scored ${correctAnswerScore} out of 10. Keep practicing your Premier League skills and push for the title!`);
    }

    else if (parseInt(correctAnswerScore) + parseInt(incorrectAnswerScore) === 10 && parseInt(correctAnswerScore) < 7 && parseInt(correctAnswerScore) > 3) {
        alert(`Keep Trying! Mid table. Not bad, not good. You scored ${correctAnswerScore} out of 10. You need more practising!`);
    }

    else if (parseInt(correctAnswerScore) + parseInt(incorrectAnswerScore) === 10 && parseInt(correctAnswerScore) <= 3) {
        alert(`Relegation! You scored a terrible ${correctAnswerScore} out of 10. You'll spend next season in the Championship!`);
    }
}

// change colour of buttons depending on answer WebGLActiveInfo. Red for wrong green for correct
  
function setStatusClass(element, Correct) {
    clearStatusClass(element)
    if (Correct) {
      element.classList.add('correct');
    } else {
      element.classList.add('wrong');
    }
  }
  
// Clear classes of colour when new question is loaded

  function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
  }

// reset answers after every question 

function resetQuiz() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
      }
}

// reset the score when a new game is played

function resetScore() {
    if (runGame) {
        let oldScore = parseInt(document.getElementById('score').innerText);
        document.getElementById('score').innerText = 0;
        let oldWrongScore = parseInt(document.getElementById('incorrect').innerText);
        document.getElementById('incorrect').innerText = 0;
    }
}

// Increment correct and incorrect scores 

function incrementScore() {
    let oldScore = parseInt(document.getElementById('score').innerText);
    document.getElementById('score').innerText = ++oldScore;
}

function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById('incorrect').innerText);
    document.getElementById('incorrect').innerText = ++oldScore;
}

// question arrays

let questions = [{ 
    id: 0,
    question: "Which team holds the record for fewest wins in a Premier League season?",
    answers: [{ text: "Wigan Athlethic", correct: false },
        { text: "Sunderland", correct: false },
        { text: "Derby County", correct: true },
        { text: "Norwich City", correct: false }
    ]

},
{
    id: 1,
    question: "Which of these players has more Premier League appearances?",
    answers: [{ text: "Phil Neville", correct: true },
        { text: "Steven Gerrard", correct: false },
        { text: "Jamie Carragher", correct: false },
        { text: "Sol Campbell", correct: false }
    ]

},
{
    id: 2,
    question: "Which of these players has more Premier League assists?",
    answers: [{ text: "Alan Shearer", correct: false },
        { text: "Gareth Barry", correct: false },
        { text: "Christan Eriksen", correct: true },
        { text: "Ashley Young", correct: false }
    ]

},
{
    id: 3,
    question: "Which of these Premier League keepers has kept the most clean sheets?",
    answers: [{ text: "Pepe Reina", correct: false },
        { text: "Brad Friedel", correct: false },
        { text: "David De Gea", correct: true },
        { text: "Tim Howard", correct: false }
    ]

},
{
    id: 4,
    question: "Which of these players picked up the most yellow cards?",
    answers: [{ text: "Scott Parker", correct: true },
        { text: "Robbie Savage", correct: false },
        { text: "Lee Catermole", correct: false },
        { text: "Joey Barton", correct: false }
    ]

},
{
    id: 5,
    question: "Which of these clubs scored more own goals in the Premier League?",
    answers: [{ text: "Liverpool", correct: false },
        { text: "Chelsea", correct: false },
        { text: "Manchester United", correct: false },
        { text: "Arsenal", correct: true }
    ]

},
{
    id: 6,
    question: "Who finished top goal scorer in the 2003/2004 Premier League season",
    answers: [{ text: "Thierry Henry", correct: true },
        { text: "Alan Shearer", correct: false },
        { text: "Louis Saha", correct: false },
        { text: "Ruud Van Nistlerooy", correct: false }
    ]

},
{
    id: 7,
    question: "Who won the 2006/2007 Premier League goal of the season",
    answers: [{ text: "Cristiano Ronaldo", correct: false },
        { text: "Wayne Rooney", correct: true },
        { text: "Darren Bent", correct: false },
        { text: "Dimitar Berbatov", correct: false }
    ]

},
{
    id: 8,
    question: "Who won the PFA Player of the year in 2011/2012",
    answers: [{ text: "Wayne Rooney", correct: false },
        { text: "Gareth Bale", correct: false },
        { text: "Luis Suarez", correct: false },
        { text: "Robin Van Persie", correct: true }
    ]

},
{
    id: 9,
    question: "Which of these teams has more all time wins in the Premier League",
    answers: [{ text: "Everton", correct: true },
        { text: "Newcastle United", correct: false },
        { text: "Aston Villa", correct: false },
        { text: "West Ham United", correct: false }
    ]

}
]