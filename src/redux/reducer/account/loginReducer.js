import { LOGIN_ACTION, LOGIN_ACTION_SUCCESS, LOGIN_ACTION_ERROR } from '../../action/account/loginAction';

var initialState = {
   data: null,
   loading: false,
   error: null,
};
const loginReducer = (state = initialState, action) => {
   switch (action.type) {
      case LOGIN_ACTION:
         return Object.assign(state, { loading: true });
      case LOGIN_ACTION_SUCCESS:
         return Object.assign(state, {});
      case LOGIN_ACTION_ERROR:
         return Object.assign(state, {});
      default:
         return state;
   }
};

export default loginReducer;
