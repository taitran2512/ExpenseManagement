import { call, takeEvery, put } from 'redux-saga/effects';
import {
   TRANSFER_MONEY,
   TRANSFER_MONEY_ERROR,
   TRANSFER_MONEY_SUCCESS,
} from '../../action/home/transferMoneyAction';
import { transferMoneyApi } from '../../api/home/transferMoneyApi';

function* transferMoneySaga(action) {
   try {
      const response = yield transferMoneyApi(action.data);
      if (response === undefined) {
         yield put({ type: TRANSFER_MONEY_ERROR, error: 'Server không phản hồi' });
      } else {
         yield put({ type: TRANSFER_MONEY_SUCCESS, response: response });
      }
   } catch (error) {
      const err = 'Không kết nối được với máy chủ';
      yield put({ type: TRANSFER_MONEY_ERROR, error: err });
   }
}

export function* watchtransferMoneySaga() {
   yield takeEvery(TRANSFER_MONEY, transferMoneySaga);
}
