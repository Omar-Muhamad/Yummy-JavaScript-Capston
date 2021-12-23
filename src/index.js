import './style.css';
import mealApi from './mealAPI.js';
import popComment from './popComment.js';
import involementApi from './involvementAPI.js';

mealApi.displayMeals();
involementApi.displayLikes();

const main = document.querySelector('main');
main.addEventListener('click', (event) => {
  if (event.target.classList.contains('commentBtn')) {
    const parent = event.target.parentNode;
    const mealID = parent.dataset.id;
    popComment.renderPopComment(mealID);
    involementApi.renderComments(mealID);
    involementApi.addComment(mealID);
  }
});
