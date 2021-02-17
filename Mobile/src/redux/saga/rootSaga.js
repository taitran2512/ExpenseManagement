import { all } from 'redux-saga/effects';
import { watchLoginSaga } from './account/loginSaga';
export default function* rootSaga() {
   yield all([watchLoginSaga()]);
}
