const likeURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/lCNzVmZgTty5Cce1TAf3/likes/';

async function fetchLikes() {
  const response = await fetch(likeURL);
  return response.json();
}

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

const updateLikes = (event) => {
  const itemId = event.target.parentElement.parentElement.getAttribute('data-id');
  postLikes({ item_id: itemId })
    .then(() => {
      displayLikes();
    });
};

// ############# Comments Utils ############
const getComments = async (mealID) => {
  const CommentsURL = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/lCNzVmZgTty5Cce1TAf3/comments?item_id=${mealID}`;
  const response = await fetch(CommentsURL);
  const data = await response.json();
  return data;
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

export default { displayLikes, updateLikes, renderComments };
