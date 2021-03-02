import {
   GET_HISTORY_INCOME,
   GET_HISTORY_INCOME_SUCCESS,
   GET_HISTORY_INCOME_ERROR,
} from '../../action/history/getHistoryType';

var initialState = {
   status: null,
   data: [],
   loading: false,
   message: null,
   error: null,
};
const getIncomeReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_HISTORY_INCOME:
         return {
            status: null,
            data: [],
            loading: true,
            message: null,
            error: null,
         };
      case GET_HISTORY_INCOME_SUCCESS:
         return {
            status: action.response.status,
            data: action.response.data,
            message: action.response.message,
            loading: false,
            error: null,
         };
      case GET_HISTORY_INCOME_ERROR:
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

export default getIncomeReducer;
