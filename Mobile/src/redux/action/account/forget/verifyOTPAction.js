export const VERIFY_OTP = 'VERIFY_OTP';
export const VERIFY_OTP_SUCCESS = 'VERIFY_OTP_SUCCESS';
export const VERIFY_OTP_ERROR = 'VERIFY_OTP_ERROR';

export const verifyOTPAction = (_id, otp) => {
   return {
      type: VERIFY_OTP,
      data: { _id, otp },
   };
};
