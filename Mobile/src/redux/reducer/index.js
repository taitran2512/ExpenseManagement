import { combineReducers } from 'redux';
import loginReducer from './account/loginReducer';
import signupReducer from './account/signupReducer';
import createWalletReducer from './home/createWalletReducer';
import getWalletReducer from './home/getWalletReducer';
import deleteWalletReducer from './home/deleteWalletReducer';
import updateWalletReducer from './home/updateWalletReducer';
import sendOTPReducer from './account/forget/sendOTPReducer';
import verifyOTPReducer from './account/forget/verifyOTPReducer';
import createNewPassReducer from './account/forget/createNewPassReducer';
import getHistoryReducer from './history/getHistoryReducer';
import getExpenseReducer from './history/getExpenseReducer';
import getIncomeReducer from './history/getIncomeReducer';
import postHistoryReducer from './history/postHistoryReducer';
import changePasswordReducer from './account/forget/changePasswordReducer';
import setColorReducer from './drawer/setColorReducer';
import showAlertReducer from './alert/showAlertReducer';
import getTotalByTypeReducer from './statistic/getTotalByTypeReducer';
const allReducers = combineReducers({
   loginReducer,
   signupReducer,
   createWalletReducer,
   getWalletReducer,
   deleteWalletReducer,
   updateWalletReducer,
   sendOTPReducer,
   verifyOTPReducer,
   createNewPassReducer,
   getHistoryReducer,
   getExpenseReducer,
   getIncomeReducer,
   postHistoryReducer,
   changePasswordReducer,
   setColorReducer,
   showAlertReducer,
   getTotalByTypeReducer,
});

export default allReducers;
