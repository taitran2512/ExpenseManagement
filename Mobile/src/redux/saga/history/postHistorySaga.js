import { call, takeEvery, put, all } from 'redux-saga/effects';
import { showAlertAction } from '../../action/alert/showAlertAction';
import { getHistoryAction } from '../../action/history/getHistoryAction';
import {
   POST_HISTORY,
   POST_HISTORY_ERROR,
   POST_HISTORY_SUCCESS,
} from '../../action/history/postHistoryAction';
import { getWalletAction } from '../../action/home/getWalletAction';
import { postHistoryAPI } from '../../api/history/postHistoryAPI';
import { getWalletSaga } from '../home/getWalletSaga';
import { goBack } from './../../../container/NavigionRef';
import { getHistorySaga } from './getHistorySaga';

function* postHistorySaga(action) {
   try {
      const response = yield call(postHistoryAPI, action.data);
      if (response === undefined) {
         yield put({ type: POST_HISTORY_ERROR, error: 'Server không phản hồi' });
         yield put(showAlertAction(error, 'Server không phản hồi'));
      } else {
         if (response.status === 'success') {
            yield put(showAlertAction('success', response.message));
            goBack();
            yield all([put(getWalletAction()), put(getHistoryAction())]);
         } else {
            yield put(showAlertAction('error', response.message));
         }
         yield put({ type: POST_HISTORY_SUCCESS, response: response });
      }
   } catch (error) {
      console.log(error);
      const err = 'Không kết nối được với máy chủ';
      yield put({ type: POST_HISTORY_ERROR, error: err });
   }
}

export function* watchPostHistorySaga() {
   yield takeEvery(POST_HISTORY, postHistorySaga);
}
