/**
 *
 *  span: class of choice
 *
 *
 */

// list of question
const questions = [
  {
    question: "do you describe yourself as...",
    choices: ["City Person", "Lazy", "Adventure Seeker"]
  },
  {
    question: "what video games do you like to play?",
    choices: ["fortnite", "overwatch", "PUG"]
  },
  {
    question: "what food do you like?",
    choices: ["pasta", "steak", "nothing"]
  },
  {
    question: "what is your favorite movie?",
    choices: ["rush hour series", "avengers", "batman dark knight"]
  }
];

const result = [
  "Play Boy",
  "Grill Cheese",
  "Tiger",
  "Hobo",
  "Hard Worker",
  "Normal White Boy",
  "Sassy Player",
  "Hypebeast",
  "Hypebae",
  "Food Porn",
  "Shady Quacker",
  "The Final Six",
  "Bird Box",
  "Bird Box 2.0",
  "Hippie",
  "Quirky",
  "Cayenne"
];

// question id
var questionID = 0;
// question amount to answer => subject to change by user
var questionAmount = 4;
// start game
var startGame = false;
// timer
var startTimer = false;
// 10 sec timer var
var timer;

// grab all dom element
const questionNumber = document.querySelector(".questionNumber");
const spiritName = document.querySelector(".spirit-name");
const questionHeader = document.querySelector(".content-header");
const answerList = document.querySelector(".answer-list");
const answerChoice = Array.from(
  document.querySelectorAll("input[name=answer]")
);
const nextBtn = document.querySelector("#controller");
const resetBtn = document.querySelector(".reset");
const startBtn = document.querySelector(".start");

// this will start up after load
defaultStartup();

function defaultStartup() {
  if (!startGame) {
    document.querySelector(".content-body").style.display = "none";
    document.querySelector(
      ".content-msg"
    ).innerHTML = `<h2>Click start to play!</h2>`;
  }
}

// fetch random result
function showResult() {
  const i = Math.floor(Math.random() * result.length);
  spiritName.innerHTML = `<h2>${result[i]}</h2>`;
}

// shuffle each answers
function shuffled(arr) {
  // copy arr
  arr = arr.slice();
  for (let i = 0; i < arr.length; i++) {
    let j = Math.floor(Math.random() * (arr.length - i)) + i;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

// display question in squential order
function displayQuestion() {
  const question = shuffled(questions[questionID].question);
  const choices = shuffled(questions[questionID].choices);

  questionHeader.innerHTML = `<h2>${question}</h2>`;
  questionNumber.innerHTML = `<h1>Q${questionID}</h1>`;

  answerChoice.forEach((input, i) => {
    input.value = choices[i];
    input.checked = false;
    input.nextElementSibling.textContent = choices[i];
  });
}

function resetQuiz() {
  // basically reset everything from scratch
  questionID = 0;
  spiritName.innerHTML = null;
  nextBtn.disabled = false;
}

function init() {
  if (startGame) {
    document.querySelector(".content-body").style.display = "block";
    document.querySelector(".content-msg").innerHTML = null;

    // diplay question
    displayQuestion();
  }
}

nextBtn.addEventListener("click", function() {
  const answer = answerChoice.find(input => input.checked);

  // check only if user didnt select one answer
  if (!answer) return;

  // if question is answered
  if (answer) questionID++;

  // if question reach to max => show result
  if (questionID >= questions.length) {
    showResult();

    // disabled next button
    nextBtn.disabled = true;

    // return nothing if all condition met
    return;
  }

  // should continue to display
  displayQuestion();
});

resetBtn.addEventListener("click", function() {
  // user should receive this confirmation
  const answer = confirm("Are you sure? ");

  // if they selected yes => resetQuiz() inits
  if (answer) {
    console.log("resetting...");
    resetQuiz();
  }

  // will restart and view the question from the beginning
  displayQuestion();
});

startBtn.addEventListener("click", e => {
  if (e.target && !startGame) {
    console.log("starting game");

    // set start game to true
    startGame = true;

    // run this function to start the game
    init();
  }

  return false;
});
