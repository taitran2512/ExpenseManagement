import { call, takeEvery, put } from 'redux-saga/effects';
import {
   POST_HISTORY,
   POST_HISTORY_ERROR,
   POST_HISTORY_SUCCESS,
} from '../../action/history/postHistoryAction';
import { postHistoryAPI } from '../../api/history/postHistoryAPI';

function* postHistorySaga(action) {
   try {
      const response = yield postHistoryAPI(action.data);
      if (response === undefined) {
         yield put({ type: POST_HISTORY_ERROR, error: 'Server không phản hồi' });
      } else {
         yield put({ type: POST_HISTORY_SUCCESS, response: response });
      }
   } catch (error) {
      const err = 'Không kết nối được với máy chủ';
      yield put({ type: POST_HISTORY_ERROR, error: err });
   }
}

export function* watchPostHistorySaga() {
   yield takeEvery(POST_HISTORY, postHistorySaga);
}
