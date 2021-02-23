import {
   VERIFY_OTP,
   VERIFY_OTP_SUCCESS,
   VERIFY_OTP_ERROR,
} from '../../../action/account/forget/verifyOTPAction';

var initialState = {
   status: null,
   loading: false,
   message: null,
   error: null,
};
const verifyOTPReducer = (state = initialState, action) => {
   switch (action.type) {
      case VERIFY_OTP:
         return {
            status: null,
            loading: true,
            message: null,
            error: null,
         };
      case VERIFY_OTP_SUCCESS:
         return {
            status: action.response.status,
            message: action.response.message,
            loading: false,
            error: null,
         };
      case VERIFY_OTP_ERROR:
         return {
            status: null,
            loading: false,
            message: null,
            error: action.error,
         };
      default:
         return state;
   }
};

export default verifyOTPReducer;
