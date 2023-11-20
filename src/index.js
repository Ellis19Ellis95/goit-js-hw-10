// Вже існуючий код
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
const breedName = document.querySelector('.breed-name');
const description = document.querySelector('.description');
const temperament = document.querySelector('.temperament');
const catImage = document.querySelector('.cat-image');

// Відобразити повідомлення про помилку
function showError() {
  loader.classList.add('hidden');
  error.classList.remove('hidden');
}

// Відобразити завантажувач
function showLoader() {
  loader.classList.remove('hidden');
  error.classList.add('hidden');
  catInfo.classList.add('hidden');
}

// Оновити відомості про кота
function updateCatInfo(catData) {
  breedName.textContent = catData.breeds[0].name;
  description.textContent = catData.breeds[0].description;
  temperament.textContent = catData.breeds[0].temperament;
  catImage.src = catData[0].url;
}

// Оновити список порід
function updateBreedsList(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

// Заповнити select зі списком порід при завантаженні сторінки
window.addEventListener('DOMContentLoaded', () => {
  showLoader();
  fetchBreeds()
    .then(breeds => {
      updateBreedsList(breeds);
      loader.classList.add('hidden');
      breedSelect.classList.remove('hidden');
    })
    .catch(() => {
      showError();
    });
});

// Оновити інформацію про кота після обрання породи у селекті
breedSelect.addEventListener('change', () => {
  showLoader();
  const selectedBreedId = breedSelect.value;
  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      updateCatInfo(catData);
      catInfo.classList.remove('hidden');
    })
    .catch(() => {
      showError();
    });
});

// Додатковий код для встановлення URL зображення
const imageURL = 'URL_З_ЗОБРАЖЕННЯМ';

// Встановлюємо src за допомогою JavaScript
catImage.setAttribute('src', imageURL);
catImage.setAttribute('alt', 'Cat'); // Додатково встановлюємо атрибут alt