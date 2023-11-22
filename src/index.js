import axios from "axios";

const apiKey = "твій ключ";
axios.defaults.headers.common["x-api-key"] = apiKey;

// Приклад вставки отриманих даних у DOM

// Отримання елементів DOM
const catImage = document.getElementById('cat-image');
const catInfo = document.getElementById('cat-info');

// Виклик функції отримання інформації про кота
fetchCatByBreed('breedId') // Замість 'breedId' вкажіть фактичний ідентифікатор породи кота
  .then(data => {
    // Встановлення URL зображення кота
    catImage.src = data.url;
    catImage.alt = 'Image of a cat';

    // Оновлення інформації про кота
    catInfo.innerHTML = `
      <h2>${data.breed.name}</h2>
      <p>Description: ${data.breed.description}</p>
      <p>Temperament: ${data.breed.temperament}</p>
    `;
  })
  .catch(error => {
    console.error('Error:', error);
    // Обробка помилки
  });


// Покаже loader під час виконання запиту
function showLoader() {
    const loader = document.querySelector('.loader');
    loader.classList.remove('hidden');
  }
  
  // Приховає loader після завершення запиту
  function hideLoader() {
    const loader = document.querySelector('.loader');
    loader.classList.add('hidden');
  }
  
  // Показати/приховати елементи під час запитів
  function showLoadingElements() {
    const breedSelect = document.querySelector('select.breed-select');
    const catInfo = document.querySelector('div.cat-info');
    const error = document.querySelector('.error');
  
    breedSelect.classList.add('hidden'); // Приховати список порід під час завантаження
    catInfo.classList.add('hidden'); // Приховати інформацію про кота під час завантаження
    error.classList.add('hidden'); // Приховати повідомлення про помилку
  
    showLoader(); // Показати завантажувач
  }
  
  // Функція для приховування завантажувача та показу списку порід/інформації про кота
  function hideLoadingElements() {
    const breedSelect = document.querySelector('select.breed-select');
    const catInfo = document.querySelector('div.cat-info');
  
    breedSelect.classList.remove('hidden'); // Показати список порід піісля завантаження
    catInfo.classList.remove('hidden'); // Показати інформацію про кота після завантаження
  
    hideLoader(); // Приховати завантажувач
  }
  
  // Викликати showLoadingElements() перед початком запитів
  // Викликати hideLoadingElements() після завершення кожного запиту

  // Приклад коду для обробки помилок під час запиту списку порід
fetchBreeds()
.then(data => {
  // Обробка отриманих даних про породи кішок
  // ...
})
.catch(error => {
  const errorElement = document.querySelector('.error');
  errorElement.classList.remove('hidden'); // Відображення елемента з помилкою
  console.error('Error fetching breeds:', error);
});

// Приклад коду для обробки помилок під час запиту інформації про кота за породою
fetchCatByBreed('breedId')
  .then(data => {
    // Обробка отриманих даних про кота
    // ...
  })
  .catch(error => {
    const errorElement = document.querySelector('.error');
    errorElement.classList.remove('hidden'); // Відображення елемента з помилкою
    console.error('Error fetching cat by breed:', error);
  });
  // Приклад використання SlimSelect для селекту порід кішок
const breedSelect = new SlimSelect({
    select: '#breed-select',
    placeholder: 'Select a breed', // Підказка для селекту
    onChange: (info) => {
      const selectedBreedId = info.value(); // Отримання значення вибраної породи
      // Виклик функції для отримання даних про кота за вибраною породою
      fetchCatByBreed(selectedBreedId)
        .then(data => {
          // Оновлення інформації про кота на сторінці
          // ...
        })
        .catch(error => {
          // Обробка помилки
        });
    },
  });
  
  // Заповнення селекту порід кішок
  fetchBreeds()
    .then(data => {
      data.forEach(breed => {
        breedSelect.addData({ text: breed.name, value: breed.id });
      });
    })
    .catch(error => {
      // Обробка помилки
    });
    
    // Приклад використання Notiflix для сповіщення про помилку
fetchBreeds()
.then(data => {
  // Оновлення селекту порід кішок
  // ...
})
.catch(error => {
  Notiflix.Notify.Failure('Oops! Something went wrong while fetching cat breeds.');
  console.error('Error fetching breeds:', error);
});