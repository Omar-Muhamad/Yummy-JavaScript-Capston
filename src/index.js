import './style.css';
import mealApi from './mealAPI.js';
import { renderComment } from './popComment.js';
import involementApi from './involvementAPI.js';

const displayData = (categoryName) => {
  mealApi.displayMeals(categoryName);
  mealApi.displayDataLength(categoryName);
  involementApi.displayLikes();
};

mealApi.displayCategories();
displayData('Beef');

const select = document.querySelector('.form-select');
select.addEventListener('change', (event) => {
  const categoryName = event.target.value;
  displayData(categoryName);
});

const main = document.querySelector('main');
main.addEventListener('click', (event) => {
  if (event.target.classList.contains('commentBtn')) {
    const parent = event.target.parentNode;
    const mealID = parent.dataset.id;
    renderComment(mealID);
  }
});
