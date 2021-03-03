import {
   POST_HISTORY,
   POST_HISTORY_SUCCESS,
   POST_HISTORY_ERROR,
} from '../../action/history/postHistoryAction';

var initialState = {
   status: null,
   data: [],
   loading: false,
   message: null,
   error: null,
};
const postHistoryReducer = (state = initialState, action) => {
   switch (action.type) {
      case POST_HISTORY:
         return {
            status: null,
            data: [],
            loading: true,
            message: null,
            error: null,
         };
      case POST_HISTORY_SUCCESS:
         return {
            status: action.response.status,
            data: action.response.data,
            message: action.response.message,
            loading: false,
            error: null,
         };
      case POST_HISTORY_ERROR:
         return {
            status: null,
            data: [],
            loading: false,
            message: null,
            error: action.error,
         };
      default:
         return state;
   }
};

export default postHistoryReducer;
