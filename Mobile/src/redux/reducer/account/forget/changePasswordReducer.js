import {
   CHANGE_PASSWORD,
   CHANGE_PASSWORD_SUCCESS,
   CHANGE_PASSWORD_ERROR,
} from '../../../action/account/forget/changePasswordAction';

var initialState = {
   status: null,
   loading: false,
   message: null,
   error: null,
};
const changePasswordReducer = (state = initialState, action) => {
   switch (action.type) {
      case CHANGE_PASSWORD:
         return {
            status: null,
            loading: true,
            message: null,
            error: null,
         };
      case CHANGE_PASSWORD_SUCCESS:
         return {
            status: action.response.status,
            message: action.response.message,
            loading: false,
            error: null,
         };
      case CHANGE_PASSWORD_ERROR:
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

export default changePasswordReducer;
