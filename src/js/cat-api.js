
import axios from 'axios';

const apiKey = 'live_qZO7TNMdL1rg7fGC7EGhcr1xQ0BS5PeYcJYCFQPoKnJmK1M7zLIYuo7mVRMjgG7g'; 

axios.defaults.headers.common['x-api-key'] = apiKey;

const loader = document.querySelector('.loader');
const errorElement = document.querySelector('.error');

export function fetchBreeds() {
  loader.classList.remove('hidden');
  errorElement.classList.add('hidden');

  return axios.get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      loader.classList.add('hidden');
      return response.data;
    })
    .catch(error => {
      errorElement.classList.remove('hidden');
      loader.classList.add('hidden');
      throw new Error(error);
    });
}

export function fetchCatByBreed(breedId) {
  loader.classList.remove('hidden');
  errorElement.classList.add('hidden');

  const apiUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=${apiKey}`;
  return fetch(apiUrl)
    .then(response => {
      loader.classList.add('hidden');
      return response.json();
    })
    .then(data => data)
    .catch(error => {
      errorElement.classList.remove('hidden');
      loader.classList.add('hidden');
      throw new Error(error);
    });
}