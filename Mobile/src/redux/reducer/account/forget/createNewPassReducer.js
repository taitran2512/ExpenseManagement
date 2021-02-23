import {
   CREATE_NEW_PASS,
   CREATE_NEW_PASS_SUCCESS,
   CREATE_NEW_PASS_ERROR,
} from '../../../action/account/forget/createNewPassAction';

var initialState = {
   status: null,
   loading: false,
   message: null,
   error: null,
};
const createNewPassReducer = (state = initialState, action) => {
   switch (action.type) {
      case CREATE_NEW_PASS:
         return {
            status: null,
            loading: true,
            message: null,
            error: null,
         };
      case CREATE_NEW_PASS_SUCCESS:
         return {
            status: action.response.status,
            message: action.response.message,
            loading: false,
            error: null,
         };
      case CREATE_NEW_PASS_ERROR:
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

export default createNewPassReducer;
