import { call, takeEvery, put } from 'redux-saga/effects';
import {
   GET_HISTORY_INCOME,
   GET_HISTORY_INCOME_ERROR,
   GET_HISTORY_INCOME_SUCCESS,
} from '../../action/history/getHistoryType';
import { getHistoryIncomeAPI } from '../../api/history/getHistoryIncomeAPI';

function* getHistoryIncomeSaga(action) {
   try {
      const response = yield getHistoryIncomeAPI();
      if (response === undefined) {
         yield put({ type: GET_HISTORY_INCOME_ERROR, error: 'Server không phản hồi' });
      } else {
         yield put({ type: GET_HISTORY_INCOME_SUCCESS, response: response });
      }
   } catch (error) {
      const err = 'Không kết nối được với máy chủ';
      yield put({ type: GET_HISTORY_INCOME_ERROR, error: err });
   }
}

export function* watchGetHistoryIncomeSaga() {
   yield takeEvery(GET_HISTORY_INCOME, getHistoryIncomeSaga);
}
