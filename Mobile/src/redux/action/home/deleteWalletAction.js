export const DELETE_WALLET = 'DELETE_WALLET';
export const DELETE_WALLET_SUCCESS = 'DELETE_WALLET_SUCCESS';
export const DELETE_WALLET_ERROR = 'DELETE_WALLET_ERROR ';

export const deleteWalletAction = (id) => {
   return {
		type: 'DELETE_WALLET',
		data: {id}
   };
};
