export const CREATE_WALLET = 'CREATE_WALLET';
export const CREATE_WALLET_SUCCESS = 'CREATE_WALLET_SUCCESS';
export const CREATE_WALLET_ERROR = 'CREATE_WALLET_ERROR ';

export const createWalletAction = (walletName, walletMoney) => {
   return {
      type: CREATE_WALLET,
      data: { walletName, walletMoney },
   };
};
