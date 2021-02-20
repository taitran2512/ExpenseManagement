import {
   UPDATE_WALLET,
   UPDATE_WALLET_SUCCESS,
   UPDATE_WALLET_ERROR,
} from '../../action/home/updateWalletAction';

var initialState = {
   status: null,
   data: [],
   loading: false,
   message: null,
   error: null,
};
const updateWalletReducer = (state = initialState, action) => {
   switch (action.type) {
      case UPDATE_WALLET:
         return {
            status: null,
            data: [],
            loading: true,
            message: null,
            error: null,
         };
      case UPDATE_WALLET_SUCCESS:
         return {
            status: action.response.status,
            data: action.response.data,
            message: action.response.message,
            loading: false,
            error: null,
         };
      case UPDATE_WALLET_ERROR:
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

export default updateWalletReducer;
