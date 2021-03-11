import {
   GET_TOTAL_BY_TYPE,
   GET_TOTAL_BY_TYPE_SUCCESS,
   GET_TOTAL_BY_TYPE_ERROR,
} from '../../action/statistic/getTotalByTypeAction';

var initialState = {
   status: null,
   data: null,
   loading: false,
   message: null,
   error: null,
};
const getTotalByTypeReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_TOTAL_BY_TYPE:
         return {
            status: null,
            data: null,
            loading: true,
            message: null,
            error: null,
         };
      case GET_TOTAL_BY_TYPE_SUCCESS:
         return {
            status: action.response.status,
            data: action.response.data,
            message: action.response.message,
            loading: false,
            error: null,
         };
      case GET_TOTAL_BY_TYPE_ERROR:
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

export default getTotalByTypeReducer;
