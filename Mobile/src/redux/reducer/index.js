import { combineReducers } from 'redux';
import loginReducer from './account/loginReducer';
import signupReducer from './account/signupReducer';
const allReducers = combineReducers({
   loginReducer,
   signupReducer,
});

export default allReducers;
