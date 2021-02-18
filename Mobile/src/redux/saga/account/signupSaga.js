import { call, takeEvery, put } from 'redux-saga/effects';
import { SIGNUP, SIGNUP_ERROR, SIGNUP_SUCCESS } from '../../action/account/signupAction';
import { signupAPI } from '../../api/account/signupAPI';

function* signupSaga(action) {
   try {
      const { input } = action.data;
      const response = yield signupAPI(input);
      if (response === undefined) {
         yield put({ type: SIGNUP_ERROR, error: 'Server không phản hồi' });
      } else {
         yield put({ type: SIGNUP_SUCCESS, response: response });
      }
   } catch (error) {
      const err = 'Không kết nối được với máy chủ';
      yield put({ type: SIGNUP_ERROR, error: err });
   }
}

export function* watchSignupSaga() {
   yield takeEvery(SIGNUP, signupSaga);
}
