export const GET_WALLET = 'GET_WALLET';
export const GET_WALLET_SUCCESS = 'GET_WALLET_SUCCESS';
export const GET_WALLET_ERROR = 'GET_WALLET_ERROR ';

export const getWalletAction = () => {
   return {
      type: GET_WALLET,
      data: {},
   };
};
