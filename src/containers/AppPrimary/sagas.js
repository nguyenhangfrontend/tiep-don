import { call, put, takeLatest } from 'redux-saga/effects';
import constants from 'resources/strings';
import {
  getTokenFromCodeSuccess,
  getTokenFromCodeFailure,
  getUserInfo,
  getUserInfoSuccess,
  getUserInfoFailure,
} from './actions';
import { GET_TOKEN_FROM_CODE_START, GET_USER_INFO } from './constants';
import userProvider from 'data-access/user-provider';

// lay ra duong link de tai form dich vu (ten dich vu trong submenu cap 2 o ho so benh an)
export function* getTokenFromCode({ payload }) {
  try {
    const response = yield call(userProvider.getTokenFromCode, payload);
    const { data } = response || {};
    const { access_token } = data || {};
    if (access_token) yield put(getUserInfo(access_token));
    yield put(getTokenFromCodeSuccess(access_token));
  } catch (error) {
    yield put(getTokenFromCodeFailure(error));
  }
}

export function* getUserInfoSaga({ payload }) {
  try {
    const response = yield call(userProvider.getUserInfo, payload);
    const { data } = response || {};
    if (data.code === 401) {
      // token expired
      localStorage.removeItem(constants.key.storage.current_tokenRole);
      window.location.href = `${process.env.REACT_APP_SSO_URL}logout?redirect_uri=${window.location.origin}/admin/ho-so-benh-an`;
    } else {
      yield put(getUserInfoSuccess(data));
    }
  } catch (error) {
    yield put(getUserInfoFailure(error));
  }
}

/* END */

/**
 * Root saga manages watcher lifecycle
 */
export default function* homeSagas() {
  yield takeLatest(GET_TOKEN_FROM_CODE_START, getTokenFromCode);
  yield takeLatest(GET_USER_INFO, getUserInfoSaga);
}
