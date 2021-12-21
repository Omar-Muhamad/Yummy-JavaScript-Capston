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
      <p class="likes text-end me-2"></p>
      <button class="btn btn-primary m-2">Comments</button>
      <button class="btn btn-primary">Reservations</button>
    </div>
    `;
      }
      document.querySelector('main').innerHTML = html;
    })
    .catch((error) => {
      document.querySelector('main').innerHTML = error;
    });
};

module.exports = { displayMeals };
