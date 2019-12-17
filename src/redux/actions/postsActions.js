export const getPostsAction = () => ({
  type: 'GET_POSTS_REQUEST',
});

export const setPostAction = (data) => ({
  type: 'SET_POST_REQUEST',
  payload: data
});

export const deletePostAction = (id) => ({
  type: 'DELETE_POST_REQUEST',
  payload: id,
});

export const updatePostAction = (data) => ({
  type: 'UPDATE_POST_REQUEST',
  payload: data
});
