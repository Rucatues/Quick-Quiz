const container = document.querySelector('.container');
const questionContainer = document.getElementById('question-container'); //container for questions and answers
const startButton = document.getElementById('start-btn'); //this button starts quiz
const nextButton = document.getElementById('next-btn'); //this button clicks to next question
const answerButtons = document.getElementById('answer-buttons');//container for all of the answer buttons
const allAnswerButtons = document.querySelector('.btn')//targeting each answer button which all share the class of btn
const text = document.getElementById('question-text'); //targets the actual questions
const answer1 = document.getElementById('Answer1'); //targets id for each individual answer- first answer
const answer2 = document.getElementById('Answer2'); //targets id for each individual answer- second answer
const answer3 = document.getElementById('Answer3'); //targets id for each individual answer- third answer
const endContainer = document.querySelector('.end-container'); //container that pops up at the end of the game
const submitBtn = document.querySelector(".submitBtn"); //button that submits your initials to local storage
const initialsBox = document.getElementById('initials-box') //box where you put your initials 
const finalScore = document.getElementById('final-score') //targets the final score
const highScore = document.querySelector('.high-score')
const recentScores = document.getElementById('recent-scores');
const time = document.querySelector('.time-left');
var secondsLeft = 60;
let info = []
let score = 0;

const storageArray = JSON.parse(localStorage.getItem('quiz game'))
if (storageArray !== null) {
    info = storageArray;
}
console.log(info)
console.log(storageArray);
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
        correctAnswer: "ID"
    }
]

startButton.addEventListener('click', startGame);

function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function () {
        secondsLeft--;
        time.textContent = secondsLeft + " seconds until end of game";

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            gameOver();
            time.classList.add("hide");
        }

    }, 1000);
}
function startGame() {
    console.log('Game started.');
    startButton.classList.add('hide');
    answerButtons.classList.remove('hide');
    giveFirstQuestion(0);
    setTime();
}


function giveFirstQuestion(globalIndex) {
    text.innerText = questions[globalIndex].questionText;
    answer1.innerHTML = questions[globalIndex].choices[0];
    answer2.innerHTML = questions[globalIndex].choices[1];
    answer3.innerHTML = questions[globalIndex].choices[2]

    answer1.addEventListener('click', (event) => {
        answer1.classList.add('chosenAnswer');
        selectAnswer(answer1.innerText, globalIndex);
        answer1.classList.add('disabled');
        answer2.classList.add('disabled');
        answer3.classList.add('disabled');
    });
    answer2.addEventListener('click', (event) => {
        answer2.classList.add('chosenAnswer');
        selectAnswer(answer2.innerText, globalIndex);
        answer1.classList.add('disabled');
        answer2.classList.add('disabled');
        answer3.classList.add('disabled');
    });
    answer3.addEventListener('click', (event) => {
        answer3.classList.add('chosenAnswer');

        selectAnswer(answer3.innerText, globalIndex);
        answer1.classList.add('disabled');
        answer2.classList.add('disabled');
        answer3.classList.add('disabled');
    });

}

// function disabled() {
//     if (answer1.classList.contains('disabled')) {
//         answer1.classList.add('disabled');
//     }
// }

function selectAnswer(selectedAnswer, index) {
    console.log(selectedAnswer);
    if (selectedAnswer === questions[index].correctAnswer) {
        console.log('Correct');
        score += 5;
    } else {
        console.log('Wrong');
    }

    console.log(index);
    index++;
    goToNextQuestion(index);
}
function goToNextQuestion(index) {
    console.log(index);
    if (index <= questions.length) {
        nextButton.classList.remove('hide');
        nextButton.addEventListener('click', (event) => {
            if ((answer1 || answer2 || answer3).classList.contains('disabled')) {

                answer1.classList.remove('disabled');
                answer2.classList.remove('disabled');
                answer3.classList.remove('disabled');
            }
            if ((answer1.classList.contains('chosenAnswer')) || (answer2.classList.contains('chosenAnswer')) || (answer3.classList.contains('chosenAnswer'))) {
                answer1.classList.remove('chosenAnswer');
                answer2.classList.remove('chosenAnswer');
                answer3.classList.remove('chosenAnswer');
            }
            event.preventDefault();
            if (index < questions.length) {
                giveFirstQuestion(index);
            } else if (index === questions.length) {
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
    console.log(score);
    finalScore.innerText = score;
    storeData();
    time.classList.add("hide");
    container.classList.add('hide');
}

function storeData() {
    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();
        // console.log(initialsBox.value);
        const userObj = {
            score: score,
            initials: initialsBox.value
        }
        info.push(userObj);
        localStorage.setItem('quiz game', JSON.stringify(info))
        displayHighScore();
    })
}

function displayHighScore() {
    recentScores.classList.remove('hide');
    for (let i = 0; i < info.length; i++) {
        console.log(info[i]);
        var listItem = document.createElement('li');
        // let arrayOfInfo = Object.entries(info[i]) //trying to list the object entries in an array
        // let sortedScores = arrayOfInfo.sort((a, b) => b[1] - a[1])   //to then sort them
        // console.log(sortedScores)
        listItem.textContent = info[i].initials + ' ' + info[i].score; /* and then would need to change info to sortedScores here*/
        highScore.appendChild(listItem);
    }
}
