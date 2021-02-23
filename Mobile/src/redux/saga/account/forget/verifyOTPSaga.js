import { call, takeEvery, put } from 'redux-saga/effects';
import {
   VERIFY_OTP,
   VERIFY_OTP_ERROR,
   VERIFY_OTP_SUCCESS,
} from '../../../action/account/forget/verifyOTPAction';
import { verifyOTPAPI } from '../../../api/account/forget/verifyOTPAPI';

function* verifyOTPSaga(action) {
   try {
      const { _id, otp } = action.data;
      const response = yield verifyOTPAPI(_id, otp);
      if (response === undefined) {
         yield put({ type: VERIFY_OTP_ERROR, error: 'Server không phản hồi' });
      } else {
         yield put({ type: VERIFY_OTP_SUCCESS, response: response });
      }
   } catch (error) {
      const err = 'Không kết nối được với máy chủ';
      yield put({ type: VERIFY_OTP_ERROR, error: err });
   }
}

export function* watchVerifyOTPSaga() {
   yield takeEvery(VERIFY_OTP, verifyOTPSaga);
}
