import { call, takeEvery, put } from 'redux-saga/effects';
import {
   CREATE_WALLET,
   CREATE_WALLET_ERROR,
   CREATE_WALLET_SUCCESS,
} from '../../action/home/createWalletAction';
import { createWalletAPI } from '../../api/home/createWalletAPI';

function* createWalletSaga(action) {
   try {
      const { walletName, walletMoney } = action.data;
      const response = yield createWalletAPI(walletName, walletMoney);
      if (response === undefined) {
         yield put({ type: CREATE_WALLET_ERROR, error: 'Server không phản hồi' });
      } else {
         yield put({ type: CREATE_WALLET_SUCCESS, response: response });
      }
   } catch (error) {
      const err = 'Không kết nối được với máy chủ';
      yield put({ type: CREATE_WALLET_ERROR, error: err });
   }
}

export function* watchCreateWalletSaga() {
   yield takeEvery(CREATE_WALLET, createWalletSaga);
}
