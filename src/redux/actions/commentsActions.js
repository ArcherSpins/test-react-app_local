export const getCommentsAction = () => ({
  type: 'GET_COMMENTS_REQUEST'
});

export const setCommentAction = (data) => ({
  type: 'SET_COMMENT_REQUEST',
  payload: data
});

export const deleteCommentAction = (data) => ({
  type: 'DELETE_COMMENT_REQUEST',
  payload: data,
});
