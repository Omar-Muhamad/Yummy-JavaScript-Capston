import './style.css';
import {
  displayMeals, displayDataLength, displayLikes, displayCategories,
} from './meals.js';

const displayData = (categoryName) => {
  displayMeals(categoryName);
  displayDataLength(categoryName);
  displayLikes();
};

displayCategories();
displayData('Beef');

const select = document.querySelector('.form-select');
select.addEventListener('change', (event) => {
  const categoryName = event.target.value;
  displayData(categoryName);
});