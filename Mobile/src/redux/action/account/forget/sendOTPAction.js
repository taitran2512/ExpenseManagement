export const SEND_OTP = 'SEND_OTP';
export const SEND_OTP_SUCCESS = 'SEND_OTP_SUCCESS';
export const SEND_OTP_ERROR = 'SEND_OTP_ERROR';

export const sendOTPAction = (email) => {
   return {
      type: SEND_OTP,
      data: { email },
   };
};
