export const UPDATE_WALLET = 'UPDATE_WALLET';
export const UPDATE_WALLET_SUCCESS = 'UPDATE_WALLET_SUCCESS';
export const UPDATE_WALLET_ERROR = 'UPDATE_WALLET_ERROR ';

export const updateWalletAction = (_id, walletName, walletMoney) => {
   return {
      type: UPDATE_WALLET,
      data: { _id, walletName, walletMoney },
   };
};
