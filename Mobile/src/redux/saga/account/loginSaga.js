import { call, takeEvery, put } from 'redux-saga/effects';
import { LOGIN_ACTION, LOGIN_ACTION_ERROR, LOGIN_ACTION_SUCCESS } from '../../action/account/loginAction';
import { loginAPI } from '../../api/account/loginAPI';

function* loginSaga(action) {
   try {
      const { usename, password } = action.data;
      const response = yield loginAPI(usename, password);
      if (response === undefined) {
         yield put({ type: LOGIN_ACTION_ERROR, error: 'Server không phản hồi' });
      } else {
         yield put({ type: LOGIN_ACTION_SUCCESS, response: response });
      }
   } catch (error) {
      const err = 'Không kết nối được với máy chủ';
      yield put({ type: LOGIN_ACTION_ERROR, error: error });
   }
}

export function* watchLoginSaga() {
   yield takeEvery(LOGIN_ACTION, loginSaga);
}
