const { totp } = require("otplib");

const generateOTP = (secret) => {
	return totp.generate(secret);
};
const verifyOTP = (otp, secret) => {
	return totp.check(otp, secret);
};

module.exports = {
	generateOTP,
	verifyOTP,
};
