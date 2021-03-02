import { call, takeEvery, put } from 'redux-saga/effects';
import { GET_HISTORY, GET_HISTORY_ERROR, GET_HISTORY_SUCCESS } from '../../action/history/getHistoryAction';
import { getHistoryAPI } from '../../api/history/getHistoryAPI';

function* getHistorySaga(action) {
   try {
      const response = yield getHistoryAPI();
      if (response === undefined) {
         yield put({ type: GET_HISTORY_ERROR, error: 'Server không phản hồi' });
      } else {
         yield put({ type: GET_HISTORY_SUCCESS, response: response });
      }
   } catch (error) {
      const err = 'Không kết nối được với máy chủ';
      yield put({ type: GET_HISTORY_ERROR, error: err });
   }
}

export function* watchGetHistorySaga() {
   yield takeEvery(GET_HISTORY, getHistorySaga);
}
