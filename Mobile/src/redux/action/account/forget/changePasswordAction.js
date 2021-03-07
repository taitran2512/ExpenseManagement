export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_ERROR = 'CHANGE_PASSWORD_ERROR';

export const changePasswordAction = (oldPassword, newPassword) => {
   return {
      type: CHANGE_PASSWORD,
      data: { oldPassword, newPassword },
   };
};
