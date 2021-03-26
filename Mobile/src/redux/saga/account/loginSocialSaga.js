import { call, takeEvery, put } from 'redux-saga/effects';
import {
   LOGIN_SOCIAL,
   LOGIN_SOCIAL_ERROR,
   LOGIN_SOCIAL_SUCCESS,
} from '../../action/account/loginSocialAction';
import { loginSocialAPI } from '../../api/account/loginSocialAPI';

function* loginSocialSaga(action) {
   try {
      const response = yield loginSocialAPI(action.data);
      if (response === undefined) {
         yield put({ type: LOGIN_SOCIAL_ERROR, error: 'Server không phản hồi' });
      } else {
         yield put({ type: LOGIN_SOCIAL_SUCCESS, response: response });
      }
   } catch (error) {
      const err = 'Không kết nối được với máy chủ';
      yield put({ type: LOGIN_SOCIAL_ERROR, error: err });
   }
}

export function* watchLoginSocialSaga() {
   yield takeEvery(LOGIN_SOCIAL, loginSocialSaga);
}
