import { call, takeEvery, put } from 'redux-saga/effects';
import {
   CREATE_NEW_PASS,
   CREATE_NEW_PASS_ERROR,
   CREATE_NEW_PASS_SUCCESS,
} from '../../../action/account/forget/createNewPassAction';
import { createNewPassAPI } from '../../../api/account/forget/createNewPassAPI';

function* createNewPassSaga(action) {
   try {
      const { _id, newPassword } = action.data;
      const response = yield createNewPassAPI(_id, newPasswords);
      if (response === undefined) {
         yield put({ type: CREATE_NEW_PASS_ERROR, error: 'Server không phản hồi' });
      } else {
         yield put({ type: CREATE_NEW_PASS_SUCCESS, response: response });
      }
   } catch (error) {
      const err = 'Không kết nối được với máy chủ';
      yield put({ type: CREATE_NEW_PASS_ERROR, error: err });
   }
}

export function* watchCreateNewPassSaga() {
   yield takeEvery(CREATE_NEW_PASS, createNewPassSaga);
}
