import { all } from 'redux-saga/effects';
import { watchLoginSaga } from './account/loginSaga';
import { watchSignupSaga } from './account/signupSaga';
import { watchCreateWalletSaga } from './home/createWalletSaga';
import { watchDeleteWalletSaga } from './home/deleteWalletSaga';
import { watchGetWalletSaga } from './home/getWalletSaga';
import { watchUpdateWalletSaga } from './home/updateWalletSaga';

export default function* rootSaga() {
   yield all([
      watchLoginSaga(),
      watchSignupSaga(),
      watchCreateWalletSaga(),
      watchGetWalletSaga(),
      watchDeleteWalletSaga(),
      watchUpdateWalletSaga(),
   ]);
}
