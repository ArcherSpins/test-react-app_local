
import { all } from 'redux-saga/effects';
import postsSaga from './postsSaga';

export default function* root(): any {
  yield all([
    postsSaga(),
  ]);
}
