import axios from 'axios';

const apiKey = 'live_qZO7TNMdL1rg7fGC7EGhcr1xQ0BS5PeYcJYCFQPoKnJmK1M7zLIYuo7mVRMjgG7g';
axios.defaults.headers.common['x-api-key'] = apiKey;

const breedSelect = document.createElement('select');
breedSelect.classList.add('breed-select');

const loader = document.createElement('p');
loader.classList.add('loader', 'hidden');
loader.textContent = 'Loading data, please wait...';

const error = document.createElement('p');
error.classList.add('error', 'hidden');
error.textContent = 'Oops! Something went wrong! Try reloading the page!';

const catInfo = document.createElement('div');
catInfo.classList.add('cat-info', 'hidden');

const breedName = document.createElement('h2');
breedName.classList.add('breed-name');

const description = document.createElement('p');
description.classList.add('description');

const temperament = document.createElement('p');
temperament.classList.add('temperament');

const catImage = document.createElement('img');
catImage.classList.add('cat-image');
catImage.setAttribute('src', '');
catImage.setAttribute('alt', 'Cat');

document.body.appendChild(breedSelect);
document.body.appendChild(loader);
document.body.appendChild(error);
document.body.appendChild(catInfo);

catInfo.appendChild(breedName);
catInfo.appendChild(description);
catInfo.appendChild(temperament);
catInfo.appendChild(catImage);

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
  
  if (catData.breeds && catData.breeds.length > 0) {
    breedName.textContent = catData.breeds[0].name;
    description.textContent = catData.breeds[0].description;
    temperament.textContent = catData.breeds[0].temperament;
  } else {
   
    breedName.textContent = catData.someProperty;
    description.textContent = catData.someOtherProperty;
    temperament.textContent = catData.someAdditionalProperty;
  }
  catImage.src = catData.url;
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
