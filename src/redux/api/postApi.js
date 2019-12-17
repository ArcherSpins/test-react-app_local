let postId = Math.floor(Math.random() * 1122112);
let commentId = Math.floor(Math.random() * 100232);

export async function getPosts() {
  try {
    const data = localStorage.getItem('posts');
    if (data) {
      return JSON.parse(data);
    }
    return [];
  } catch(error) {
    throw new Error(error);
  }
}

export async function getComments() {
  try {
    const data = localStorage.getItem('comments');
    if (data) {
      return JSON.parse(data);
    }
    return [];
  } catch(error) {
    throw new Error(error);
  }
}

export async function deleteComments({ commentId }) {
  try {
    const comments = await getComments();
    localStorage.setItem('comments', JSON.stringify(comments.filter(item => String(item.id) !== String(commentId))));
  } catch(error) {
    throw new Error(error);
  }
}

export async function setComment(data) {
  try {
    const comments = await getComments();
    localStorage.setItem('comments', JSON.stringify([...comments, { ...data, id: commentId }]));
    commentId++;
  } catch(error) {
    throw new Error(error);
  }
}

export async function setPost(data) {
  try {
    const posts = await getPosts() || [];
    localStorage.setItem(
      'posts', JSON.stringify([...posts, { ...data, id: postId }]),
    );
    postId++;
  } catch(error) {
    throw new Error(error);
  }
}

export async function updatePost(data) {
  try {
    const posts = await getPosts() || [];
    const post = posts.find(item => String(data.id) === String(item.id));
    localStorage.setItem(
      'posts', JSON.stringify([...posts.filter(item => String(item.id) !== String(data.id)), { ...post, description: data.content }]),
    );
  } catch(error) {
    throw new Error(error);
  }
}

export async function deletePost({ postId }) {
  try {
    const posts = await getPosts() || [];
    localStorage.setItem(
      'posts', JSON.stringify(posts.filter(post => String(post.id) !== String(postId))),
    );
  } catch(error) {
    throw new Error(error);
  }
}
