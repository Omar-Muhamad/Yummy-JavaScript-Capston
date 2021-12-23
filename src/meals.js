import {
  fetchLikes, fetchMeals, postLikes, fetchCategories,
} from './API.js';
import renderCommentsPopup from './commentsPopup.js';

const displayLikes = () => {
  fetchLikes()
    .then((data) => {
      for (let i = 0; i < data.length; i += 1) {
        const parent = document.querySelector(`[data-id="${data[i].item_id}"]`);
        if (parent) {
          const paragraph = parent.querySelector('.likes');
          paragraph.textContent = `Likes ${data[i].likes}`;
        }
      }
    });
};

const updateLikes = (event) => {
  const itemId = event.target.parentElement.parentElement.getAttribute('data-id');
  postLikes({ item_id: itemId })
    .then(() => {
      displayLikes();
    });
};

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
      const main = document.querySelector('.main');
      main.innerHTML = html;

      main.addEventListener('click', (event) => {
        if (event.target.classList.contains('commentBtn')) {
          const parent = event.target.parentNode;
          const mealID = parent.dataset.id;
          renderCommentsPopup(mealID);
        }
      });

      const hearts = document.querySelectorAll('.fa-heart');
      [...hearts].forEach((heart) => { heart.addEventListener('click', updateLikes); });
      displayLikes();
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

export {
  displayMeals, displayDataLength, displayLikes, displayCategories,
};
