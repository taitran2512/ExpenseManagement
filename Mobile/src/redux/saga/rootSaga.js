import { all } from 'redux-saga/effects';
import { watchLoginSaga } from './account/loginSaga';
import { watchSignupSaga } from './account/signupSaga';
import { watchCreateWalletSaga } from './home/createWalletSaga';
export default function* rootSaga() {
   yield all([watchLoginSaga(), watchSignupSaga(), watchCreateWalletSaga()]);
}
