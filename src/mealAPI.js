import involementApi from './involvementAPI.js';

async function fetchMeals(categoryName) {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`;
  const response = await fetch(URL);
  return response.json();
}

async function fetchCategories() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/categories.php';
  const response = await fetch(URL);
  return response.json();
}

const displayMeals = (categoryName) => {
  fetchMeals(categoryName)
    .then((data) => {
      let html = '';
      for (let i = 0; i < data.meals.length; i += 1) {
        const item = data.meals[i];
        html += `
    <div class="col-md-4 col-sm-6 text-center pb-5" data-id=${item.idMeal}>
      <img class="img-thumbnail rounded" src=${item.strMealThumb} alt=${item.strMeal}>
      <h5 class="py-2">${item.strMeal}</h5>
      <div class="d-flex gap-5 justify-content-center">
        <p class="likes text-end">Likes 0</p>
        <i class="fas fa-heart fs-4 text-danger"></i>
      </div>
      <button class="btn btn-primary m-2 commentBtn">Comments</button>
      <button class="btn btn-primary">Reservations</button>
    </div>
    `;
      }
      document.querySelector('.main').innerHTML = html;
      const hearts = document.querySelectorAll('.fa-heart');
      [...hearts].forEach((heart) => { heart.addEventListener('click', involementApi.updateLikes); });
    })
    .catch((error) => {
      document.querySelector('.main').innerHTML = error;
    });
};

const displayCategories = () => {
  const select = document.querySelector('.form-select');
  fetchCategories()
    .then((data) => {
      data.categories.forEach((item) => {
        const opt = document.createElement('option');
        opt.value = item.strCategory;
        opt.innerHTML = item.strCategory;
        select.appendChild(opt);
      });
    });
};

const dataLength = (categoryName) => fetchMeals(categoryName)
  .then((data) => data.meals.length);

const displayDataLength = (categoryName) => {
  dataLength(categoryName).then((data) => {
    const navItem = document.querySelector('.disabled');
    navItem.textContent = `${data} ${categoryName} recipes`;
  });
};

export default {
  displayMeals, dataLength, displayCategories, displayDataLength,
};
