import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";

const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
const breedSelect = document.querySelector('.breed-select');
const catImage = document.querySelector('.cat-image img');
const catName = document.querySelector('.cat-info h3');
const catDescription = document.querySelector('.cat-info p');
const catTemperament = document.querySelector('.cat-info span');

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

function updateBreedsList(breeds) {
  const elements = breeds.map(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    return option;
  });
  breedSelect.append(...elements);   
  breedSelect.classList.remove('hidden');
  loader.classList.add('hidden');    
}

breedSelect.addEventListener('change', () => {
  showLoader();
  const selectedBreedId = breedSelect.value;
  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      updateCatInfo(catData[0]);
      catInfo.classList.remove('hidden');
    })
    .catch(() => {
      showError();
    });
});

function updateCatInfo(catData) {
  const catInfoHTML = `
    <div class="cat-image">
      <img src="${catData.url}" alt="${catData.name}" />
      <div>
        <h3>${catData.name}</h3>
        <p>${catData.description || 'No description available'}</p>
        <p>Temperament: <span>${catData.temperament || 'Unknown temperament'}</span></p>
      </div>
    </div>`;
  catInfo.innerHTML = catInfoHTML;
}

function showLoader() {
  loader.classList.remove('hidden');
  error.classList.add('hidden');
  catInfo.classList.add('hidden');
}

function showError() {
  error.classList.remove('hidden');
  loader.classList.add('hidden');
  catInfo.classList.add('hidden');
}