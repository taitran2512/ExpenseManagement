import { combineReducers } from 'redux';
import loginReducer from './account/loginReducer';
import signupReducer from './account/signupReducer';
import createWalletReducer from './home/createWalletReducer';
const allReducers = combineReducers({
   loginReducer,
   signupReducer,
   createWalletReducer,
});

export default allReducers;
