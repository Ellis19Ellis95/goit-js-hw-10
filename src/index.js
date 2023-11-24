import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";

const loader = document.querySelector('.loader');
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

window.addEventListener('DOMContentLoaded', () => {
  showLoader();
  fetchBreeds()
    .then(breeds => {
      updateBreedsList(breeds);
      breedSelect.classList.remove('hidden');
      hideLoader(); // Приховуємо елемент завантаження після завершення завантаження порід
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
}

breedSelect.addEventListener('change', () => {
  showLoader();
  catInfo.innerHTML = '';
  const selectedBreedId = breedSelect.value;
  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      updateCatInfo(catData[0]);
      catInfo.classList.remove('hidden');
      hideLoader(); // Приховуємо елемент завантаження після завершення завантаження даних про кота
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
        <p><span>${catData.breeds[0].description || 'No description available'}</span></p>
        <p>Temperament: <span>${catData.breeds[0].temperament || 'Unknown temperament'}</span></p>
      </div>
    </div>`;
  catInfo.innerHTML = catInfoHTML;
}

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}