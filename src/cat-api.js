const selectElement = document.createElement('select');
selectElement.classList.add('breed-select');

const loaderElement = document.createElement('p');
loaderElement.classList.add('loader', 'hidden');
loaderElement.textContent = 'Loading data, please wait...';

const errorElement = document.createElement('p');
errorElement.classList.add('error', 'hidden');
errorElement.textContent = 'Oops! Something went wrong! Try reloading the page!';

const catInfoElement = document.createElement('div');
catInfoElement.classList.add('cat-info', 'hidden');

const breedNameElement = document.createElement('h2');
breedNameElement.classList.add('breed-name');

const descriptionElement = document.createElement('p');
descriptionElement.classList.add('description');

const temperamentElement = document.createElement('p');
temperamentElement.classList.add('temperament');

const catImageElement = document.createElement('img');
catImageElement.classList.add('cat-image');
catImageElement.setAttribute('src', '');
catImageElement.setAttribute('alt', 'Cat');

// Вставка елементів в DOM
document.body.appendChild(selectElement);
document.body.appendChild(loaderElement);
document.body.appendChild(errorElement);
document.body.appendChild(catInfoElement);

catInfoElement.appendChild(breedNameElement);
catInfoElement.appendChild(descriptionElement);
catInfoElement.appendChild(temperamentElement);
catInfoElement.appendChild(catImageElement);

import axios from 'axios';

const apiKey = 'YOUR_API_KEY_HERE'; // Замініть це на ваш ключ

axios.defaults.headers.common['x-api-key'] = apiKey;

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      throw new Error(error);
    });
}

export function fetchCatByBreed(breedId) {
  return axios.get(https://api.thecatapi.com/v1/images/search?breed_ids=${breedId})
    .then(response => response.data)
    .catch(error => {
      throw new Error(error);
    });
}