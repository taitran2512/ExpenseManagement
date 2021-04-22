export const TRANSFER_MONEY = 'TRANSFER_MONEY';
export const TRANSFER_MONEY_SUCCESS = 'TRANSFER_MONEY_SUCCESS';
export const TRANSFER_MONEY_ERROR = 'TRANSFER_MONEY_ERROR';

export const transferMoneyAction = (input) => {
   return {
      type: TRANSFER_MONEY,
      data: input,
   };
};
