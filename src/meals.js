import { fetchLikes, fetchMeals, postLikes } from './API.js';
import renderCommentsPopup from './commentsPopup.js';

const displayLikes = () => {
  fetchLikes()
    .then((data) => {
      for (let i = 0; i < 6; i += 1) {
        const parent = document.querySelector(`[data-id="${data[i].item_id}"]`);
        const paragraph = parent.querySelector('.likes');
        paragraph.textContent = `Likes ${data[i].likes}`;
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
      const main = document.querySelector('main');
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
      document.querySelector('main').innerHTML = error;
    });
};

export default displayMeals;
