import { SIGNUP, SIGNUP_SUCCESS, SIGNUP_ERROR } from '../../action/account/signupAction';

var initialState = {
   status: null,
   data: null,
   loading: false,
   message: null,
   error: null,
};
const signupReducer = (state = initialState, action) => {
   switch (action.type) {
      case SIGNUP:
         return {
            status: null,
            data: null,
            loading: true,
            message: null,
            error: null,
         };
      case SIGNUP_SUCCESS:
         return {
            status: action.response.status,
            // data: action.response.data,
            message: action.response.message,
            loading: false,
            error: null,
         };
      case SIGNUP_ERROR:
         return {
            status: null,
            data: null,
            loading: false,
            message: null,
            error: action.error,
         };
      default:
         return state;
   }
};

export default signupReducer;
