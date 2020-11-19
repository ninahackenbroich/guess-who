// Elements
const personName = document.querySelector('.name');
const nameToFind = document.querySelector('#employee-name');
const card = document.querySelector('.card-category');
const names = document.querySelectorAll('.name');

// // Functions

const toggleNameClass = (event) => {
  event.currentTarget.classList.toggle('hidden');
};

const toggleActiveOnClick = (name) => {
    name.addEventListener('click', toggleNameClass);
};

names.forEach(toggleActiveOnClick);
