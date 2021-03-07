import { call, takeEvery, put } from 'redux-saga/effects';
import {
   CHANGE_PASSWORD,
   CHANGE_PASSWORD_SUCCESS,
   CHANGE_PASSWORD_ERROR,
} from '../../../action/account/forget/changePasswordAction';
import { changePasswordApi } from '../../../api/account/forget/changePasswordAPI';

function* changePasswordSaga(action) {
   try {
      const { oldPassword, newPassword } = action.data;
      const response = yield changePasswordApi(oldPassword, newPassword);
      if (response === undefined) {
         yield put({ type: CHANGE_PASSWORD_ERROR, error: 'Server không phản hồi' });
      } else {
         yield put({ type: CHANGE_PASSWORD_SUCCESS, response: response });
      }
   } catch (error) {
      const err = 'Không kết nối được với máy chủ';
      yield put({ type: CHANGE_PASSWORD_ERROR, error: err });
   }
}

export function* watchChangePasswordSaga() {
   yield takeEvery(CHANGE_PASSWORD, changePasswordSaga);
}
