import { call, takeEvery, put } from 'redux-saga/effects';
import {
   UPDATE_WALLET,
   UPDATE_WALLET_ERROR,
   UPDATE_WALLET_SUCCESS,
} from '../../action/home/updateWalletAction';
import { updateWalletAPI } from '../../api/home/updateWalletAPI';

function* updateWalletSaga(action) {
   try {
      const { _id, walletName, walletMoney } = action.data;
      const response = yield updateWalletAPI(_id, walletName, walletMoney);
      if (response === undefined) {
         yield put({ type: UPDATE_WALLET_ERROR, error: 'Server không phản hồi' });
      } else {
         yield put({ type: UPDATE_WALLET_SUCCESS, response: response });
      }
   } catch (error) {
      const err = 'Không kết nối được với máy chủ';
      yield put({ type: UPDATE_WALLET_ERROR, error: err });
   }
}

export function* watchUpdateWalletSaga() {
   yield takeEvery(UPDATE_WALLET, updateWalletSaga);
}
