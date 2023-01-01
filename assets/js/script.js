const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const text = document.getElementById('question-text');
const answer1 = document.getElementById('Answer1');
const answer2 = document.getElementById('Answer2');
const answer3 = document.getElementById('Answer3');
const endContainer = document.querySelector('.end-container');
let globalIndex = 0;
let score = 0;

const questions = [
    {
        questionText: "What does CSS stand for?",
        choices: ["Crabs Swimming Slowly", "Cascading Style Sheets", "Color Style Sheet"
        ],
        correctAnswer: "Cascading Style Sheets"
    },
    {
        questionText: "What is the CSS property to change the background color of an element?",
        choices: ["background-color", "bckgroundcolor", "colorofbackground"],
        correctAnswer: "background-color"
    },
    {
        questionText: "When considering CSS Specificity, which one of the following is most specific?",
        choices: ["class", "ID", "element"],
        correctAnswer: "background-color"
    }
]

startButton.addEventListener('click', startGame);

function startGame() {
    console.log('Game started.');
    startButton.classList.add('hide');
    answerButtons.classList.remove('hide');
    giveFirstQuestion(globalIndex);
}

function giveFirstQuestion(globalIndex) {
    text.innerText = questions[globalIndex].questionText;
    answer1.innerHTML = questions[globalIndex].choices[0];
    answer2.innerHTML = questions[globalIndex].choices[1];
    answer3.innerHTML = questions[globalIndex].choices[2]
    answer1.addEventListener('click', (event) => {
        event.preventDefault();
        selectAnswer(answer1.innerText);
    });
    answer2.addEventListener('click', (event) => {
        event.preventDefault();
        selectAnswer(answer2.innerText);
    });
    answer3.addEventListener('click', (event) => {
        event.preventDefault();
        selectAnswer(answer3.innerText);
    });

}

function selectAnswer(selectedAnswer) {
    console.log(selectedAnswer);
    if (selectedAnswer === questions[globalIndex]?.correctAnswer) {
        console.log('Correct')
        score += 5;
    } else {
        console.log('Wrong')
    }
    globalIndex++;
    console.log(globalIndex);
    if (globalIndex < questions.length) {
        nextButton.classList.remove('hide');
        nextButton.addEventListener('click', (event) => {
            event.preventDefault();
            // console.log(event);
            if (globalIndex < questions.length) {
                giveFirstQuestion(globalIndex);
            } else {
                console.log('Game Over');
                gameOver();
            }
        })
    }
}

function gameOver() {
    questionContainer.classList.add('hide');
    nextButton.classList.add('hide');
    endContainer.classList.remove('hide');
    console.log(score)
}
