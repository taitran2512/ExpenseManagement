export const POST_HISTORY = 'POST_HISTORY';
export const POST_HISTORY_SUCCESS = 'POST_HISTORY_SUCCESS';
export const POST_HISTORY_ERROR = 'POST_HISTORY_ERROR';

export const postHistoryAction = (input) => {
   return {
      type: POST_HISTORY,
      data: input,
   };
};
