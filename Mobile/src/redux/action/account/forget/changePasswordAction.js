export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_ERROR = 'CHANGE_PASSWORD_ERROR';

export const changePasswordAction = (_id, oldPassword, newPassword) => {
   return {
      type: CHANGE_PASSWORD,
      data: { _id, oldPassword, newPassword },
   };
};
