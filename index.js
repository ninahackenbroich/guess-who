// Fetching random people from an API

let people = [];
let isGameRunning = false;

let jobTitles = [
  "CEO",
  "COO",
  "CFO",
  "CMO",
  "CTO",
  "Marketing Manager",
  "Product Manager",
  "Project Manager",
  "Finance Manager",
  "Human Resources Manager",
  "Operations Manager",
  "Marketing Specialist",
  "Business Analyst",
  "Human Resource Personnel",
  "Accountant",
  "Sales Representative",
  "Customer Service Representative",
  "Administrative Assistant",
  "Front-End Developver",
  "Back-End Developer",
  "Fullstack Developer",
  "Trainee",
  "Intern",
  "Property Manager",
  "Facility Manager",
  "Associate",
  "Team Assistant",
  "Working Student",
  "Social Media Manager",
  "PR Manager",
];

async function getJobs() {
  let response = await fetch(
    "http://api.dataatwork.org/v1/jobs/unusual_titles"
  );
  let data = await response.json();
  return data;
}

async function getUsers() {
  let response = await fetch("https://randomuser.me/api/?results=100");
  let data = await response.json();
  return data;
}

getUsers().then((data) => {
  console.log("End of fetch");
  for (let i = 0; i < 100; i++) {
    people.push({
      id: i,
      name: data.results[i].name.first,
      jobTitle: "",
      imgUrl: data.results[i].picture.large,
      gender: data.results[i].gender,
    });
  }
});

getJobs().then((data) => {
  data.forEach((da) => {
    // jobTitles.push(da.title[0].toUpperCase() + da.title.substring(1));
    jobTitles.push(da.title.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()));
  });
  console.log("End of fetch");
  for (let i = 0; i < 100; i++) {
    people[i].jobTitle =
      jobTitles[Math.floor(Math.random() * jobTitles.length)];
  }
});

// Elements
const personName = document.querySelector(".name");
const nameToFind = document.querySelector("#employee-name");
const cards = document.querySelectorAll(".card-category");
const cardTexts = document.querySelectorAll(".card-text");
const names = document.querySelectorAll(".name");
const positions = document.querySelectorAll(".position");
const timer = document.getElementById("timer-time");
const btnStart = document.getElementById("start");
const title = document.getElementById("guess-who");
const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const spanModal = document.getElementsByClassName("close")[0];
const gameTop = document.querySelector(".game-top");
const gameMiddle = document.querySelector(".game-middle");
const gameEnd = document.querySelector(".game-bottom");
const scoresElements = document.querySelector(".scores");
const clockElement = document.querySelector(".clock");
const btnPlayAgain = document.querySelector("#replay");
const scoreElement = document.querySelector("#score");
const highscoreElement = document.querySelector("#highscore");

// Functions

// Start Game

btnStart.addEventListener("click", function () {
  shuffle();
  setUI();
  startGame();
});

// Shuffle feature

const shuffle = () => {
  amountOfTries = 0;
  cardTexts.forEach((card) => (card.style.display = "none"));
  removeBorders();
  // get a random person
  const getRandomPersonFromList =
    people[Math.floor(Math.random() * people.length)];
  correctAnswer = getRandomPersonFromList.name;
  // remove the chosen person from the list so that you can't get them again
  people.splice(people.indexOf(getRandomPersonFromList), 1);
  // console.log(getRandomPersonFromList);
  nameToFind.innerText = getRandomPersonFromList.name;
  // get a list of people with the same gender and shuffle it
  const shuffeledListOfSameGender = people
    .filter((person) => person.gender === getRandomPersonFromList.gender)
    .sort(() => Math.random() - 0.5);
  // console.log(shuffeledListOfSameGender);

  // create a result array and push the random person initially
  let result = [getRandomPersonFromList];
  // add as many more users as you want
  for (let i = 0; i < 3; i++) {
    result.push(shuffeledListOfSameGender.pop());
  }
  // assign the length of the result array to a value so we can use it in the for loop
  const resultSize = result.length;
  for (let i = 0; i < resultSize; i++) {
    let randomResultPerson = result[Math.floor(Math.random() * result.length)];
    result.splice(result.indexOf(randomResultPerson), 1);
    names[i].innerText = randomResultPerson.name;
    positions[i].innerText = randomResultPerson.jobTitle;
    cards[
      i
    ].style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${randomResultPerson.imgUrl})`;
  }
};

// Show content after clicking on btn Start

function setUI() {
  title.classList.remove("title");
  title.innerHTML = "Guess who is...";
  btnStart.style.display = "none";
  // gameTop.style.visibility = "visible";
  clockElement.style.visibility = "visible";
  scoresElements.style.visibility = "visible";
  gameMiddle.style.display = "block";
  gameEnd.style.display = "block";
}

// Countdown timer

const startGame = () => {
  isGameRunning = true;
  score = 0;
  initializeClock("clockdiv", deadline);
};

const timeInMinutes = 0.5;
let currentTime = Date.parse(new Date());
let deadline = new Date(currentTime + timeInMinutes * 60 * 1000);

function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  return {
    total,
    minutes,
    seconds,
  };
}

function initializeClock(id, endtime) {
  const clock = document.getElementById(id);
  const minutesSpan = clock.querySelector(".minutes");
  const secondsSpan = clock.querySelector(".seconds");

  function updateClock() {
    const t = getTimeRemaining(endtime);
    minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
    secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
      isGameRunning = false;
      updateHighscore();
      localStorage.setItem("highscore", parseInt(highscoreElement.innerHTML));
      resetScore();
      playAgain();
    }
  }
  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
}

// Active Card - Wrong or right?? - Set Borders

const checkIfCorrect = (event) => {
  let tempChildren = Array.from(event.target.children);
  tempChildren.forEach((child) => (child.style.display = "block"));
  console.log(event.target.firstElementChild.textContent);
  if (event.target.firstElementChild.textContent == nameToFind.textContent) {
    event.target.parentElement.classList.add("border-yay");
    updateScore();
    setTimeout(shuffle, 2000);
  } else {
    amountOfTries += 1;
    event.target.parentElement.classList.add("border-wrong");
  }
};

const addCardEventListner = (name) => {
  name.addEventListener("click", checkIfCorrect);
};

const toggleNameClass = (event) => {
  event.currentTarget.classList.toggle("hidden");
};

const toggleActiveOnClick = (name) => {
  name.addEventListener("click", toggleNameClass);
};

names.forEach(toggleActiveOnClick);

cards.forEach(addCardEventListner);

// Function to remove yay/wrong borders

const removeBorders = () => {
  cards.forEach((card) => {
    // remove all classes from element
    card.classList.remove(...card.classList);
    card.classList.add("card-category");
  });
};

// Function to count the score and highscore

highscoreElement.innerText = localStorage.getItem("highscore") || 0;

let score = 0;
let amountOfTries = 0;

const calculatePoints = () => {
  if (amountOfTries === 0) {
    return 3;
  } else if (amountOfTries === 1) {
    return 1;
  } else {
    return 0;
  }
};

const updateScore = () => {
  score += calculatePoints();
  scoreElement.innerHTML = `Score: ${score}`;
};

const resetScore = () => {
  scoreElement.innerHTML = `Score: 0`;
};

let highscore = Number(highscoreElement.innerHTML);

const updateHighscore = () => {
  if (score > highscore) {
    highscoreElement.innerHTML = `${score}`;
    highscore = score;
  }
};

// reset logic

const playAgain = () => {
  document.querySelector("body").classList.add("backgroundbody-orange");
  btnPlayAgain.classList.toggle("button-gone");
  title.innerHTML = "What do you want to do?";
  clockElement.style.visibility = "none";
  scoresElements.style.color = "#2d4059";
  gameMiddle.style.display = "none";
  gameEnd.style.display = "none";
};

btnPlayAgain.addEventListener("click", function () {
  btnPlayAgain.classList.toggle("button-gone");
  document.querySelector("body").classList.remove("backgroundbody-orange");
  scoresElements.style.color = "#f9a828";
  currentTime = Date.parse(new Date());
  deadline = new Date(currentTime + timeInMinutes * 60 * 1000);
  shuffle();
  setUI();
  startGame();
});

// MODAL HOW IT WORKS

btn.onclick = function () {
  modal.style.display = "block";
};
spanModal.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
