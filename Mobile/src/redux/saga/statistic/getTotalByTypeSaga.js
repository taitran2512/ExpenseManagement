import { call, takeEvery, put } from 'redux-saga/effects';
import {
   GET_TOTAL_BY_TYPE,
   GET_TOTAL_BY_TYPE_ERROR,
   GET_TOTAL_BY_TYPE_SUCCESS,
} from '../../action/statistic/getTotalByTypeAction';
import { getTotalByTypeApi } from '../../api/statistic/getTotalByTypeApi';

function* getTotalByTypeSaga(action) {
   try {
      const response = yield getTotalByTypeApi();
      if (response === undefined) {
         yield put({ type: GET_TOTAL_BY_TYPE_ERROR, error: 'Server không phản hồi' });
      } else {
         yield put({ type: GET_TOTAL_BY_TYPE_SUCCESS, response: response });
      }
   } catch (error) {
      const err = 'Không kết nối được với máy chủ';
      yield put({ type: GET_TOTAL_BY_TYPE_ERROR, error: err });
   }
}

export function* watchGetTotalByTypeSaga() {
   yield takeEvery(GET_TOTAL_BY_TYPE, getTotalByTypeSaga);
}
