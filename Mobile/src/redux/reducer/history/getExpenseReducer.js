import {
   GET_HISTORY_EXPENSE,
   GET_HISTORY_EXPENSE_SUCCESS,
   GET_HISTORY_EXPENSE_ERROR,
} from '../../action/history/getHistoryType';

var initialState = {
   status: null,
   data: [],
   loading: false,
   message: null,
   error: null,
};
const getExpenseReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_HISTORY_EXPENSE:
         return {
            status: null,
            data: [],
            loading: true,
            message: null,
            error: null,
         };
      case GET_HISTORY_EXPENSE_SUCCESS:
         return {
            status: action.response.status,
            data: action.response.data,
            message: action.response.message,
            loading: false,
            error: null,
         };
      case GET_HISTORY_EXPENSE_ERROR:
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

export default getExpenseReducer;
