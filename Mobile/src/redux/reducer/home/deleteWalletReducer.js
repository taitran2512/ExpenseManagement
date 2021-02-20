import { DELETE_WALLET, DELETE_WALLET_SUCCESS, DELETE_WALLET_ERROR } from '../../action/home/deleteWalletAction';

var initialState = {
   status: null,
   data: [],
   loading: false,
   message: null,
   error: null,
};
const deleteWalletReducer = (state = initialState, action) => {
   switch (action.type) {
      case DELETE_WALLET:
         return {
            status: null,
            data: [],
            loading: true,
            message: null,
            error: null,
         };
      case DELETE_WALLET_SUCCESS:
         return {
            status: action.response.status,
            data: action.response.data,
            message: action.response.message,
            loading: false,
            error: null,
         };
      case DELETE_WALLET_ERROR:
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

export default deleteWalletReducer;
