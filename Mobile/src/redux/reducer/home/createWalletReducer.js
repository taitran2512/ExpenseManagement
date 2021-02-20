import {
   CREATE_WALLET,
   CREATE_WALLET_SUCCESS,
   CREATE_WALLET_ERROR,
} from '../../action/home/createWalletAction';

var initialState = {
   status: null,
   data: null,
   loading: false,
   message: null,
   error: null,
};
const createWalletReducer = (state = initialState, action) => {
   switch (action.type) {
      case CREATE_WALLET:
         return {
            status: null,
            data: null,
            loading: true,
            message: null,
            error: null,
         };
      case CREATE_WALLET_SUCCESS:
         return {
            status: action.response.status,
            // data: action.response.data,
            message: action.response.message,
            loading: false,
            error: null,
         };
      case CREATE_WALLET_ERROR:
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

export default createWalletReducer;
