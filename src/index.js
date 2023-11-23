import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const apiKey = 'live_qZO7TNMdL1rg7fGC7EGhcr1xQ0BS5PeYcJYCFQPoKnJmK1M7zLIYuo7mVRMjgG7g'; 
axios.defaults.headers.common['x-api-key'] = apiKey;

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
const breedName = document.querySelector('.breed-name');
const description = document.querySelector('.description');
const temperament = document.querySelector('.temperament');
const catImage = document.querySelector('.cat-image');

function showError() {
  loader.classList.add('hidden');
  error.classList.remove('hidden');
}

function showLoader() {
  loader.classList.remove('hidden');
  error.classList.add('hidden');
  catInfo.classList.add('hidden');
}

function updateCatInfo(catData) {
  breedName.textContent = catData.breeds[0].name;
  description.textContent = catData.breeds[0].description;
  temperament.textContent = catData.breeds[0].temperament;
  catImage.src = catData.url; // Замініть на потрібне поле зображення у вашому об'єкті даних
}

function updateBreedsList(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

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

// Додання створених DOM-елементів на сторінку
document.body.appendChild(breedSelect);
document.body.appendChild(loader);
document.body.appendChild(error);
document.body.appendChild(catInfo);

catInfo.appendChild(breedName);
catInfo.appendChild(description);
catInfo.appendChild(temperament);
catInfo.appendChild(catImage);