import { getComments, postComment, getMeal } from './API.js';

const addCommentCount = (commentsDiv, commentsArr) => {
  const commentCounth3 = document.createElement('h3');
  commentCounth3.classList = 'commentCount';
  commentCounth3.innerHTML = `Comments (${commentsArr.length || 0})`;
  commentsDiv.appendChild(commentCounth3);
};

const renderComments = async (mealID) => {
  const commentsArr = await getComments(mealID);
  const commentsDiv = document.querySelector('#comments');
  commentsDiv.innerHTML = '';
  addCommentCount(commentsDiv, commentsArr);
  commentsArr.forEach((comment) => {
    const commentDiv = document.createElement('div');
    commentDiv.classList = 'comment';
    const commentData = `
      <p class="commentDate">${comment.creation_date}</p>
      <div class="commentText">
        <p class="userName">${comment.username}:</p>
        <p class="commentDetails">${comment.comment}</p>
      </div>
    `;
    commentDiv.innerHTML = commentData;
    commentsDiv.appendChild(commentDiv);
  });
};

const addComment = (mealID) => {
  const commentForm = document.getElementById('addComment');
  const userName = document.getElementById('userName');
  const commentMsg = document.getElementById('commentMsg');

  commentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputData = {
      item_id: mealID,
      username: userName.value,
      comment: commentMsg.value,
    };
    postComment(inputData, () => renderComments(mealID));
  });
};

const renderCommentsPopup = async (mealID) => {
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
      <div class="commentsContainer">
        <div class="comments" id="comments"></div>
        <form class="addComment" id="addComment" >
          <h3>Add a comment</h3>
          <input type="text" name="userName" class="userName" id="userName" placeholder="Your name" required>
          <textarea type="text" name="messege" class="commentMsg" id="commentMsg" placeholder="Add your comment here" required></textarea>
          <input type="submit" value="Add Comment"class="CommentBtn" id="CommentBtn">
        </form>
      </div>
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
  renderComments(mealID);
  addComment(mealID);
};

export { renderCommentsPopup, addCommentCount };