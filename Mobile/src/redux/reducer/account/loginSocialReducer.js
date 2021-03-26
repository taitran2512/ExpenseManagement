import { userData } from '../../../config/Config';
import {
   LOGIN_SOCIAL,
   LOGIN_SOCIAL_SUCCESS,
   LOGIN_SOCIAL_ERROR,
} from '../../action/account/loginSocialAction';

var initialState = {
   status: null,
   data: null,
   loading: false,
   message: null,
   error: null,
};
const loginSocialReducer = (state = initialState, action) => {
   switch (action.type) {
      case LOGIN_SOCIAL:
         return {
            status: null,
            data: null,
            loading: true,
            message: null,
            error: null,
         };
      case LOGIN_SOCIAL_SUCCESS:
         if (action.response.data !== null && action.response.data !== undefined) {
            userData._id = action.response.data._id;
            userData.fullname = action.response.data.fullname;
            userData.email = action.response.data.email;
            userData.token = action.response.token;
            userData.socialType = action.response.data.socialType;
         }
         return {
            status: action.response.status,
            data: action.response.data,
            message: action.response.message,
            loading: false,
            error: null,
         };
      case LOGIN_SOCIAL_ERROR:
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

export default loginSocialReducer;
