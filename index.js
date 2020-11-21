// Fetching random people from an API
let people = [];

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

// // Functions

const toggleNameClass = (event) => {
  event.currentTarget.classList.toggle("hidden");
};

const toggleActiveOnClick = (name) => {
  name.addEventListener("click", toggleNameClass);
};

// Shuffle feature
const shuffle = () => {
  // get a random person
  const getRandomPersonFromList =
    people[Math.floor(Math.random() * people.length)];
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

names.forEach(toggleActiveOnClick);
