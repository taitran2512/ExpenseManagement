import { combineReducers } from 'redux';
import loginReducer from './account/loginReducer';
import signupReducer from './account/signupReducer';
import createWalletReducer from './home/createWalletReducer';
import getWalletReducer from './home/getWalletReducer';
import deleteWalletReducer from './home/deleteWalletReducer';
import updateWalletReducer from './home/updateWalletReducer';
const allReducers = combineReducers({
   loginReducer,
   signupReducer,
   createWalletReducer,
   getWalletReducer,
   deleteWalletReducer,
   updateWalletReducer,
});

export default allReducers;
