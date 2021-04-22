import {
   TRANSFER_MONEY,
   TRANSFER_MONEY_SUCCESS,
   TRANSFER_MONEY_ERROR,
} from '../../action/home/transferMoneyAction';

var initialState = {
   status: null,
   loading: false,
   message: null,
   error: null,
};
const transferMoneyReducer = (state = initialState, action) => {
   switch (action.type) {
      case TRANSFER_MONEY:
         return {
            status: null,
            loading: true,
            message: null,
            error: null,
         };
      case TRANSFER_MONEY_SUCCESS:
         return {
            status: action.response.status,
            message: action.response.message,
            loading: false,
            error: null,
         };
      case TRANSFER_MONEY_ERROR:
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

export default transferMoneyReducer;
