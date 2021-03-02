export const GET_HISTORY_EXPENSE = 'GET_HISTORY_EXPENSE';
export const GET_HISTORY_EXPENSE_SUCCESS = 'GET_HISTORY_EXPENSE_SUCCESS';
export const GET_HISTORY_EXPENSE_ERROR = 'GET_HISTORY_EXPENSE_ERROR';

export const getHistoryExpenseAction = () => {
   return {
      type: GET_HISTORY_EXPENSE,
   };
};
///////////////////////////////////////////////////////////
export const GET_HISTORY_INCOME = 'GET_HISTORY_INCOME';
export const GET_HISTORY_INCOME_SUCCESS = 'GET_HISTORY_INCOME_SUCCESS';
export const GET_HISTORY_INCOME_ERROR = 'GET_HISTORY_INCOME_ERROR';

export const getHistoryIncomeAction = () => {
   return {
      type: GET_HISTORY_INCOME,
   };
};
