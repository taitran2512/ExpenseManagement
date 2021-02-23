export const CREATE_NEW_PASS = 'CREATE_NEW_PASS';
export const CREATE_NEW_PASS_SUCCESS = 'CREATE_NEW_PASS_SUCCESS';
export const CREATE_NEW_PASS_ERROR = 'CREATE_NEW_PASS_ERROR';

export const createNewPassAction = (_id, newPassword) => {
   return {
      type: CREATE_NEW_PASS,
      data: { _id, newPassword },
   };
};
