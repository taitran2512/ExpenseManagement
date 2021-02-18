import { all } from 'redux-saga/effects';
import { watchLoginSaga } from './account/loginSaga';
import { watchSignupSaga } from './account/signupSaga';
export default function* rootSaga() {
   yield all([watchLoginSaga(), watchSignupSaga()]);
}
