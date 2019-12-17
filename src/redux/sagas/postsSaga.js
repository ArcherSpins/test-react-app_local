import {
  all,
  takeLatest,
  put,
  call
} from 'redux-saga/effects';
import { getPosts, setPost, getComments, setComment, deletePost, deleteComments, updatePost } from '../api/postApi';

export function* getPostsSaga() {
  try {
    const posts = yield call(getPosts);
    yield put({ type: 'GET_POSTS_SUCCESS', payload: posts });
  } catch (error) {
    yield put({ type: 'GET_POSTS_FAIL' });
  }
}

export function* deletePostsSaga(action) {
  try {
    yield call(deletePost, { postId: action.payload });
    yield put({ type: 'GET_POSTS_REQUEST' });
  } catch (error) {
    yield put({ type: 'DELETE_POST_FAIL' });
  }
}

export function* updatePostSaga(action) {
  try {
    yield call(updatePost, action.payload);
    yield put({ type: 'GET_POSTS_REQUEST' });
  } catch (error) {
    yield put({ type: 'UPDATE_POST_FAIL' });
  }
}

export function* deleteCommentSaga(action) {
  try {
    yield call(deleteComments, { commentId: action.payload });
    yield put({ type: 'GET_COMMENTS_REQUEST' });
  } catch (error) {
    yield put({ type: 'DELETE_COMMENT_FAIL' });
  }
}

export function* getCommentsSaga() {
  try {
    const comments = yield call(getComments);
    yield put({ type: 'GET_COMMENTS_SUCCESS', payload: comments });
  } catch (error) {
    yield put({ type: 'GET_COMMENTS_FAIL' });
  }
}

export function* setCommentSaga(action) {
  try {
    const comments = yield call(setComment, action.payload);
    yield put({ type: 'SET_COMMENT_SUCCESS', payload: comments });
    yield put({ type: 'GET_COMMENTS_REQUEST' });
  } catch (error) {
    yield put({ type: 'SET_COMMENT_FAIL' });
  }
}

export function* setPostSaga(action) {
  try {
    const posts = yield call(setPost, action.payload);
    yield put({ type: 'SET_POST_SUCCESS', payload: posts });
    yield put({ type: 'GET_POSTS_REQUEST' });
  } catch (error) {
    yield put({ type: 'SET_POST_FAIL' });
  }
}

export default function* root(): Saga<void> {
  yield all([
    takeLatest('GET_POSTS_REQUEST', getPostsSaga),
    takeLatest('SET_POST_REQUEST', setPostSaga),
    takeLatest('GET_COMMENTS_REQUEST', getCommentsSaga),
    takeLatest('SET_COMMENT_REQUEST', setCommentSaga),
    takeLatest('DELETE_POST_REQUEST', deletePostsSaga),
    takeLatest('DELETE_COMMENT_REQUEST', deleteCommentSaga),
    takeLatest('UPDATE_POST_REQUEST', updatePostSaga),
  ])
}
