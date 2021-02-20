import { call, takeEvery, put } from 'redux-saga/effects';
import { GET_WALLET, GET_WALLET_ERROR, GET_WALLET_SUCCESS } from '../../action/home/getWalletAction';
import { getWalletAPI } from '../../api/home/getWalletAPI';

function* getWalletSaga(action) {
   try {
      const response = yield getWalletAPI();
      if (response === undefined) {
         yield put({ type: GET_WALLET_ERROR, error: 'Server không phản hồi' });
      } else {
         yield put({ type: GET_WALLET_SUCCESS, response: response });
      }
   } catch (error) {
      const err = 'Không kết nối được với máy chủ';
      yield put({ type: GET_WALLET_ERROR, error: err });
   }
}

export function* watchGetWalletSaga() {
   yield takeEvery(GET_WALLET, getWalletSaga);
}
