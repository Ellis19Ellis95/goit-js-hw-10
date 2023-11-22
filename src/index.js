import axios from 'axios';

const apiKey = 'live_qZO7TNMdL1rg7fGC7EGhcr1xQ0BS5PeYcJYCFQPoKnJmK1M7zLIYuo7mVRMjgG7g'; 
axios.defaults.headers.common['x-api-key'] = apiKey;

// отримання списку порід котів
export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      throw new Error(error);
    });
}

// отримання інформації про кота за його породою
export function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      throw new Error(error);
    });
}
const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
const breedName = document.querySelector('.breed-name');
const description = document.querySelector('.description');
const temperament = document.querySelector('.temperament');
const catImage = document.querySelector('.cat-image');

//показ завантажувача
function showLoader() {
  loader.classList.remove('hidden');
  error.classList.add('hidden');
  catInfo.classList.add('hidden');
}

//показ помилки
function showError() {
  loader.classList.add('hidden');
  error.classList.remove('hidden');
}


function updateCatInfo(catData) {
    breedName.textContent = catData[0].breeds[0].name;
    description.textContent = catData[0].breeds[0].description;
    temperament.textContent = catData[0].breeds[0].temperament;
  
    // Отримання URL зображення
    const imageURL = catData[0].url;
    const catImage = document.querySelector('.cat-image');

    // Встановлення src та alt для зображення 
   catImage.setAttribute('src', '');
   catImage.setAttribute('alt', 'Cat');
}

// Оновлення списку порід
function updateBreedsList(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

// Після завантаження сторінки отримання списку порід
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

// Після обрання породи отримання інформації про кота
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