import { combineReducers } from 'redux';
import loginReducer from './account/loginReducer';
const allReducers = combineReducers({
   loginReducer,
});

export default allReducers;
