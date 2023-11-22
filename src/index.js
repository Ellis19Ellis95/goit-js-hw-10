import axios from 'axios';

const apiKey = 'live_qZO7TNMdL1rg7fGC7EGhcr1xQ0BS5PeYcJYCFQPoKnJmK1M7zLIYuo7mVRMjgG7g'; 
axios.defaults.headers.common['x-api-key'] = apiKey;

function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      throw new Error(error);
    });
}

function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      throw new Error(error);
    });
}

function updateCatInfo(catData) {
  const breedName = document.querySelector('.breed-name');
  const description = document.querySelector('.description');
  const temperament = document.querySelector('.temperament');
  const catImage = document.querySelector('.cat-image');
  
  breedName.textContent = catData[0].breeds[0].name;
  description.textContent = catData[0].breeds[0].description;
  temperament.textContent = catData[0].breeds[0].temperament;
  catImage.src = catData[0].url;
  catImage.alt = 'Cat';
}

function updateBreedsList(breeds) {
  const breedSelect = document.querySelector('.breed-select');

  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

function showLoader() {
  const loader = document.querySelector('.loader');
  const error = document.querySelector('.error');

  loader.classList.remove('hidden');
  error.classList.add('hidden');
}

function showError() {
  const loader = document.querySelector('.loader');
  const error = document.querySelector('.error');

  loader.classList.add('hidden');
  error.classList.remove('hidden');
}

window.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.querySelector('.breed-select');
  
  showLoader();

  fetchBreeds()
    .then(breeds => {
      updateBreedsList(breeds);
      const loader = document.querySelector('.loader');
      loader.classList.add('hidden');
      breedSelect.classList.remove('hidden');
    })
    .catch(() => {
      showError();
    });

  breedSelect.addEventListener('change', () => {
    showLoader();
    const selectedBreedId = breedSelect.value;
    fetchCatByBreed(selectedBreedId)
      .then(catData => {
        updateCatInfo(catData);
        const catInfo = document.querySelector('.cat-info');
        catInfo.classList.remove('hidden');
      })
      .catch(() => {
        showError();
      });
  });
});