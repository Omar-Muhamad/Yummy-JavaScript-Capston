import involementApi from './involvementAPI.js';

async function fetchMeals() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=b';
  const response = await fetch(URL);
  return response.json();
}

const displayMeals = () => {
  fetchMeals()
    .then((data) => {
      let html = '';
      for (let i = 0; i < 6; i += 1) {
        const item = data.meals[i];
        html += `
    <div class="col-md-4 col-sm-6 text-center pb-5" data-id=${item.idMeal}>
      <img class="img-thumbnail rounded" src=${item.strMealThumb} alt=${item.strMeal}>
      <h5 class="py-2">${item.strMeal}</h5>
      <div class="d-flex gap-5 justify-content-center">
        <p class="likes text-end"></p>
        <i class="fas fa-heart fs-4 text-danger"></i>
      </div>
      <p class="likes text-end me-2"></p>
      <button class="btn btn-primary m-2 commentBtn">Comments</button>
      <button class="btn btn-primary">Reservations</button>
    </div>
    `;
      }
      document.querySelector('main').innerHTML = html;
      const hearts = document.querySelectorAll('.fa-heart');
      [...hearts].forEach((heart) => { heart.addEventListener('click', involementApi.updateLikes); });
      displayLikes();
    })
    .catch((error) => {
      document.querySelector('main').innerHTML = error;
    });
};

export default { displayMeals };
