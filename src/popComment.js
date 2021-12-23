const getMeal = async (mealID) => {
  const mealURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
  const response = await fetch(mealURL);
  const data = await response.json();
  return data.meals;
};

const renderPopComment = async (mealID) => {
  const mealArr = await getMeal(mealID);
  const meal = mealArr[0];
  const body = document.querySelector('body');
  const mealData = `
    
    <div class="mealContainer">
      <span class="closeBtn"><i class="far fa-times-circle fa-2x"></i></span>
      <div class="mealThump">
        <img src="${meal.strMealThumb}" alt"${meal.strMeal}">
      </div>
      <h2>${meal.strMeal}</h2>
      <div class="mealDetails">
        <p class="mealCategory">Category: ${meal.strCategory}</p>
        <p class="mealArea">Country: ${meal.strArea}</p>
      </div>
      <div class="comments" id="comments"></div>
      <form class="addComment" id="addComment" action="submit">
        <input type="text" name="userName" class="userName" id="userName" placeholder="Your name" required>
        <textarea type="text" name="messege" class="commentMsg" id="commentMsg" placeholder="Add your comment here" required></textarea>
        <input type="submit" class="CommentBtn" id="CommentBtn">Comment</input>
      </form>
    </div>
    `;
  const popComment = document.createElement('section');
  popComment.className = 'popComment';
  popComment.innerHTML = mealData;
  const closeBtn = popComment.querySelector('.closeBtn');
  closeBtn.addEventListener('click', () => {
    popComment.parentElement.removeChild(popComment);
    body.style.overflow = 'scroll';
  });
  body.style.overflow = 'hidden';
  body.appendChild(popComment);
};

export default { renderPopComment };