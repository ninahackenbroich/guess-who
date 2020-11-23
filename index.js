// Fetching random people from an API
let people = [];
let isGameRunning = false;

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
      jobTitle: "TestTitle",
      imgUrl: data.results[i].picture.large,
      gender: data.results[i].gender,
    });
  }
});

console.table(people);
// Elements
const personName = document.querySelector(".name");
const nameToFind = document.querySelector("#employee-name");
const cards = document.querySelectorAll(".card-category");
const names = document.querySelectorAll(".name");
const positions = document.querySelectorAll(".position");
const timer = document.getElementById("timer-time");

// Functions

const toggleNameClass = (event) => {
  event.currentTarget.classList.toggle("hidden");
};

const toggleActiveOnClick = (name) => {
  name.addEventListener("click", toggleNameClass);
};

// Card Event listener
const checkIfCorrect = (event) => {
  console.log(event.target.firstElementChild.textContent);
  if (event.target.firstElementChild.textContent == nameToFind.textContent) {
    event.target.parentElement.classList.add("border-yay");
    setTimeout(shuffle, 2000);
  } else {
    event.target.parentElement.classList.add("border-wrong");
  }
};

const addCardEventListner = (name) => {
  name.addEventListener("click", checkIfCorrect);
};

// Shuffle feature
const shuffle = () => {
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
  console.log(result);
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
    console.log(randomResultPerson);
  }
};

// Function to remove yay/wrong borders
const removeBorders = () => {
  cards.forEach((card) => {
    // remove all classes from element
    card.classList.remove(...card.classList);
    card.classList.add("card-category");
  });
};

// Function to start the game
const startGame = () => {
  isGameRunning = true;
  let countdown = setInterval(() => {
    if (parseInt(timer.textContent) > 0) {
      timer.innerText = `${parseInt(timer.textContent) - 1}`;
    } else {
      isGameRunning = false;
      clearInterval(countdown);
    }
    // console.log("tick");
  }, 1000);
};

// names.forEach(toggleActiveOnClick);
cards.forEach(addCardEventListner);



// Show content after clicking on btn Start
const btnStart = document.getElementById("start");

btnStart.addEventListener('click', function () {
  document.getElementById("guess-who").classList.toggle("title");
  btnStart.style.visibility = "hidden";
  document.querySelector(".rules").style.visibility = "hidden";

  document.querySelector(".game-top").style.opacity = 100;
  document.querySelector(".game-middle").style.opacity = 100;
  document.querySelector(".game-bottom").style.opacity = 100;
});
