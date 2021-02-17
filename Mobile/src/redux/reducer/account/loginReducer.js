import { userData } from '../../../config/Config';
import { LOGIN_ACTION, LOGIN_ACTION_SUCCESS, LOGIN_ACTION_ERROR } from '../../action/account/loginAction';

var initialState = {
   status: null,
   data: null,
   loading: false,
   message: null,
   error: null,
};
const loginReducer = (state = initialState, action) => {
   console.log(action);
   switch (action.type) {
      case LOGIN_ACTION:
         return Object.assign(state, { loading: true });
      case LOGIN_ACTION_SUCCESS:
         if (action.response.data !== null && action.response.data !== undefined) {
            userData._id = action.response.data._id;
            userData.username = action.response.data.username;
            userData.fullname = action.response.data.fullname;
            userData.dob = action.response.data.dob;
            userData.email = action.response.data.email;
            userData.phone = action.response.data.phone;
            userData.createDate = action.response.data.createDate;
         }
         return Object.assign(state, {
            status: action.response.status,
            data: action.response.data,
            message: action.response.message,
         });
      case LOGIN_ACTION_ERROR:
         return Object.assign(state, { error: action.error });
      default:
         return state;
   }
};

export default loginReducer;
