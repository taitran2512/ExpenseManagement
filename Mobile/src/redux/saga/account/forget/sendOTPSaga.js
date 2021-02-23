import { call, takeEvery, put } from 'redux-saga/effects';
import { SEND_OTP, SEND_OTP_ERROR, SEND_OTP_SUCCESS } from '../../../action/account/forget/sendOTPAction';
import { sendOTPAPI } from '../../../api/account/forget/sendOTPAPI';

function* sendOTPSaga(action) {
   try {
      const { email } = action.data;
      const response = yield sendOTPAPI(email);
      if (response === undefined) {
         yield put({ type: SEND_OTP_ERROR, error: 'Server không phản hồi' });
      } else {
         yield put({ type: SEND_OTP_SUCCESS, response: response });
      }
   } catch (error) {
      const err = 'Không kết nối được với máy chủ';
      yield put({ type: SEND_OTP_ERROR, error: err });
   }
}

export function* watchSendOTPSaga() {
   yield takeEvery(SEND_OTP, sendOTPSaga);
}
