fetchBreeds()
  .then(breeds => {
    console.log(breeds); // Перевірка отримання списку порід
  })
  .catch(error => {
    console.error('Error fetching breeds:', error);
  });

  const selectedBreedId = 'your_selected_breed_id_here'; // Підставте справжній ID породи

fetchCatByBreed(selectedBreedId)
  .then(catData => {
    console.log(catData); // Перевірка отримання інформації про кішку обраної породи
  })
  .catch(error => {
    console.error('Error fetching cat info:', error);
  });