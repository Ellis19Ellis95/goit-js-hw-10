import axios from 'axios';

const apiKey = 'live_qZO7TNMdL1rg7fGC7EGhcr1xQ0BS5PeYcJYCFQPoKnJmK1M7zLIYuo7mVRMjgG7g'; 

axios.defaults.headers.common['x-api-key'] = apiKey;

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      throw new Error(error);
    });
}

export function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      throw new Error(error);
    });
}

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
const breedName = document.querySelector('.breed-name');
const description = document.querySelector('.description');
const temperament = document.querySelector('.temperament');
const catImage = document.querySelector('.cat-image');

// Код для отримання URL зображення
function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios.get(url)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching cat image:', error);
      throw error;
    });
}

// Отримання ідентифікатора породи
const breedSelect = document.querySelector('.breed-select');
const catImage = document.querySelector('.cat-image');

breedSelect.addEventListener('change', async (event) => {
  const breedId = event.target.value;

  try {
    const data = await fetchCatByBreed(breedId);
    const imageURL = data[0]?.url || ''; // Отримання URL зображення (якщо воно є)

    catImage.setAttribute('src', imageURL); // Встановлення зображення
    catImage.setAttribute('alt', 'Cat'); // Встановлення атрибуту alt для зображення
  } catch (error) {
    console.error('Error fetching cat by breed:', error);
  }
});
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