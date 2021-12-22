import './style.css';
import mealApi from './mealAPI.js';
import { renderComment } from './popComment.js';

const main = document.querySelector('main');
main.addEventListener('click', (event) => {
  if (event.target.classList.contains('commentBtn')) {
    const parent = event.target.parentNode;
    const mealID = parent.dataset.id;
    renderComment(mealID);
  }
});

mealApi.displayMeals();