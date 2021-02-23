import { SEND_OTP, SEND_OTP_SUCCESS, SEND_OTP_ERROR } from '../../../action/account/forget/sendOTPAction';

var initialState = {
   status: null,
   loading: false,
   _id: null,
   message: null,
   error: null,
};
const sendOTPReducer = (state = initialState, action) => {
   switch (action.type) {
      case SEND_OTP:
         return {
            status: null,
            loading: true,
            message: null,
            error: null,
         };
      case SEND_OTP_SUCCESS:
         return {
            status: action.response.status,
            message: action.response.message,
            _id: action.response._id,
            loading: false,
            error: null,
         };
      case SEND_OTP_ERROR:
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

export default sendOTPReducer;
