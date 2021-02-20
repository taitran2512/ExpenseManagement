import { call, takeEvery, put } from 'redux-saga/effects';
import {
   DELETE_WALLET,
   DELETE_WALLET_ERROR,
   DELETE_WALLET_SUCCESS,
} from '../../action/home/deleteWalletAction';
import { deleteWalletAPI } from '../../api/home/deleteWalletAPI';

function* deleteWalletSaga(action) {
   try {
      const { id } = action.data;
      const response = yield deleteWalletAPI(id);
      if (response === undefined) {
         yield put({ type: DELETE_WALLET_ERROR, error: 'Server không phản hồi' });
      } else {
         yield put({ type: DELETE_WALLET_SUCCESS, response: response });
      }
   } catch (error) {
      const err = 'Không kết nối được với máy chủ';
      yield put({ type: DELETE_WALLET_ERROR, error: err });
   }
}

export function* watchDeleteWalletSaga() {
   yield takeEvery(DELETE_WALLET, deleteWalletSaga);
}
