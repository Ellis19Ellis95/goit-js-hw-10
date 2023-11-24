import axios from 'axios';

const apiKey = 'live_qZO7TNMdL1rg7fGC7EGhcr1xQ0BS5PeYcJYCFQPoKnJmK1M7zLIYuo7mVRMjgG7g'; 

axios.defaults.headers.common['x-api-key'] = apiKey;

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds0')
    .then(response => response.data)
    };


export function fetchCatByBreed(breedId) {
    const apiUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=${apiKey}0`;
    return fetch(apiUrl)
      .then(response => response.json())
      .then(data => data)
      };
  