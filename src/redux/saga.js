import { all } from 'redux-saga/effects';
import AuthSaga from './Auth/AuthSaga';
import DashboardSaga from './Dashboard/DashboardSaga';

export function* sagas() {
  yield all([AuthSaga]);
  yield all([DashboardSaga]);
}
