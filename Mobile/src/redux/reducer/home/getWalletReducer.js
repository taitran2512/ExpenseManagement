import { GET_WALLET, GET_WALLET_SUCCESS, GET_WALLET_ERROR } from '../../action/home/getWalletAction';

var initialState = {
   status: null,
   data: [],
   loading: false,
   message: null,
   error: null,
};
const getWalletReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_WALLET:
         return {
            status: null,
            data: [],
            loading: true,
            message: null,
            error: null,
         };
      case GET_WALLET_SUCCESS:
         return {
            status: action.response.status,
            data: action.response.data,
            message: action.response.message,
            loading: false,
            error: null,
         };
      case GET_WALLET_ERROR:
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

export default getWalletReducer;
