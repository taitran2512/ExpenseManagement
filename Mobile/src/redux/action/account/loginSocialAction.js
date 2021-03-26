export const LOGIN_SOCIAL = 'LOGIN_SOCIAL';
export const LOGIN_SOCIAL_SUCCESS = 'LOGIN_SOCIAL_SUCCESS';
export const LOGIN_SOCIAL_ERROR = 'LOGIN_SOCIAL_ERROR';

export const loginSocialAction = (data) => {
   return {
      type: LOGIN_SOCIAL,
      data,
   };
};
