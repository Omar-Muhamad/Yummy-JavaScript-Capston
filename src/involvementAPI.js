const likeURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/lCNzVmZgTty5Cce1TAf3/likes/';

async function fetchLikes() {
  const response = await fetch(likeURL);
  return response.json();
}

const getMeal = async (mealID) => {
  const mealURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
  const response = await fetch(mealURL);
  const data = await response.json();
  return data.meals;
};

async function postLikes(likeObj) {
  const response = await fetch(likeURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(likeObj),
  });
  return response;
}

// ############# Comments Utils ############
const getComments = async (mealID) => {
  const CommentsURL = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/lCNzVmZgTty5Cce1TAf3/comments?item_id=${mealID}`;
  const response = await fetch(CommentsURL);
  const data = await response.json();
  return data;
};

const postComment = (inputData) => {
  fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/lCNzVmZgTty5Cce1TAf3/comments', {
    method: 'POST',
    body: JSON.stringify(inputData),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })
  .then((response) => response.json())
  .then((data) => console.log(data));
};

const renderComments = async (mealID) => {
  const commentsArr = await getComments(mealID);

  const commentsDiv = document.querySelector('#comments');
  const commentCounth3 = document.createElement('h3');
  commentCounth3.classList = 'commentCount';
  commentCounth3.innerHTML = `Comments (${commentsArr.length})`;
  commentsDiv.appendChild(commentCounth3);
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
    postComment(inputData);
  });
};
export {
  fetchLikes, postLikes, postComment, getComments, getMeal,
};
