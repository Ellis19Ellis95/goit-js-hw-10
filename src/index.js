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

  // Приховати елемент завантаження після завантаження списку порід
  hideLoader();
}

// Функція, яка ховає елемент завантаження
function hideLoader() {
  loader.classList.add('hidden');
}

breedSelect.addEventListener('change', () => {
  showLoader();
  catInfo.innerHTML = '';
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
      <img src="${catData.url}" alt="${catData.breeds[0].name}" />
      <div>
        <h3>${catData.breeds[0].name}</h3>
        <p>${catData.breeds[0].description || 'No description available'}</p>
        <p>Temperament: <span>${catData.breeds[0].temperament || 'Unknown temperament'}</span></p>
      </div>
    </div>`;
  catInfo.innerHTML = catInfoHTML;
}

function showLoader() {
  loader.classList.remove('hidden');
}