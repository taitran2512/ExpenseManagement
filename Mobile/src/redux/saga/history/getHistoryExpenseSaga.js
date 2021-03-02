import { call, takeEvery, put } from 'redux-saga/effects';
import {
   GET_HISTORY_EXPENSE,
   GET_HISTORY_EXPENSE_ERROR,
   GET_HISTORY_EXPENSE_SUCCESS,
} from '../../action/history/getHistoryType';
import { getHistoryExpenseAPI } from '../../api/history/getHistoryExpenseAPI';

function* getHistoryExpenseSaga(action) {
   try {
      const response = yield getHistoryExpenseAPI();
      if (response === undefined) {
         yield put({ type: GET_HISTORY_EXPENSE_ERROR, error: 'Server không phản hồi' });
      } else {
         yield put({ type: GET_HISTORY_EXPENSE_SUCCESS, response: response });
      }
   } catch (error) {
      const err = 'Không kết nối được với máy chủ';
      yield put({ type: GET_HISTORY_EXPENSE_ERROR, error: err });
   }
}

export function* watchGetHistoryExpenseSaga() {
   yield takeEvery(GET_HISTORY_EXPENSE, getHistoryExpenseSaga);
}
