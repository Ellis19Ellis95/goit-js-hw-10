import axios from 'axios';

const apiKey = 'live_qZO7TNMdL1rg7fGC7EGhcr1xQ0BS5PeYcJYCFQPoKnJmK1M7zLIYuo7mVRMjgG7g'; 

axios.defaults.headers.common['x-api-key'] = apiKey;


export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      showError(); 
      throw new Error(error);
    })
    .finally(() => {
      hideError(); 
    });
}

export function fetchCatByBreed(breedId) {
  const apiUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=${apiKey}`;
  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
      showError(); 
      console.error('Error fetching cat by breed:', error);
      throw error;
    })
    .finally(() => {
      hideError();
    });
}