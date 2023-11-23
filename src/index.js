import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";

const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
const breedSelect = document.querySelector('.breed-select');

window.addEventListener('DOMContentLoaded', () => {
  showLoader();
  fetchBreeds()
    .then(breeds => {
      updateBreedsList(breeds);
    })
    .catch(() => {
    });
});

function updateBreedsList(breeds) {
    const elements = breeds.map(breed => {
const option = document.createElement('option');
option.value = breed.id;
option.textContent = breed.name;
return option;
    })
breedSelect.append(...elements);   
breedSelect.classList.remove('hidden');
loader.classList.add('hidden');    
}


breedSelect.addEventListener('change', () => {
  showLoader();
  const selectedBreedId = breedSelect.value;
  fetchCatByBreed(selectedBreedId)
    .then(catData => {
        console.log(catData);
    })
    .catch(() => {
      showError();
    });
});


function updateCatInfo(catData) {
     `<div class="cat-image">
        <img src="${catData.url}" alt="${catData.name}" />
        <div>
          <h3>${catData.name}</h3>
          <p>${catData.description || 'No description available'}</p>
          <p>Temperament: ${catData.temperament || 'Unknown temperament'}</p>
        </div>
      </div>`;
  }


