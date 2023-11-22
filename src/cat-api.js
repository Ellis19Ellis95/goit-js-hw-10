import axios from 'axios';

const apiKey = 'live_qZO7TNMdL1rg7fGC7EGhcr1xQ0BS5PeYcJYCFQPoKnJmK1M7zLIYuo7mVRMjgG7g';
axios.defaults.headers.common['x-api-key'] = apiKey;

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching breeds:', error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
    const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
    return axios.get(url)
      .then(response => {
        const catData = response.data[0]; // Отримуємо перший елемент, який містить дані про кота
        return {
          url: catData.url, // Повертаємо URL зображення кота
          breed: catData.breeds[0], // Повертаємо дані про породу кота
        };
      })
      .catch(error => {
        console.error('Error fetching cat by breed:', error);
        throw error;
      });
  }