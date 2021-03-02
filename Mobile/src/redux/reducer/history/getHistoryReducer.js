import { GET_HISTORY, GET_HISTORY_SUCCESS, GET_HISTORY_ERROR } from '../../action/history/getHistoryAction';

var initialState = {
   status: null,
   data: [],
   loading: false,
   message: null,
   error: null,
};
const getHistoryReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_HISTORY:
         return {
            status: null,
            data: [],
            loading: true,
            message: null,
            error: null,
         };
      case GET_HISTORY_SUCCESS:
         return {
            status: action.response.status,
            data: action.response.data,
            message: action.response.message,
            loading: false,
            error: null,
         };
      case GET_HISTORY_ERROR:
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

export default getHistoryReducer;
