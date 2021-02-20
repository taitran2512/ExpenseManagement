import { combineReducers } from 'redux';
import loginReducer from './account/loginReducer';
import signupReducer from './account/signupReducer';
import createWalletReducer from './home/createWalletReducer';
import getWalletReducer from './home/getWalletReducer';
const allReducers = combineReducers({
   loginReducer,
   signupReducer,
   createWalletReducer,
   getWalletReducer,
});

export default allReducers;
