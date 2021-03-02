export const LOGIN_ACTION = 'LOGIN_ACTION';
export const LOGIN_ACTION_SUCCESS = 'LOGIN_ACTION_SUCCESS';
export const LOGIN_ACTION_ERROR = 'LOGIN_ACTION_ERROR';
export const LOGOUT_ACTION = 'LOGOUT_ACTION';
export const loginAction = (username, password) => {
   return {
      type: LOGIN_ACTION,
      data: { username, password },
   };
};

export const logoutAction = () => {
   return {
      type: LOGOUT_ACTION,
   };
};
