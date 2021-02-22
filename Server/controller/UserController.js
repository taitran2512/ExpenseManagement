const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../model/User.model");
const { generateToken } = require("../helpers/jwt.helper");
const { sendMail } = require("../helpers/mailer.hepler");
const { generateOTP, verifyOTP } = require("../helpers/otp.helper");
function ResultModel(status, message, token = null, data = null) {
	return {
		status: status,
		message: message,
		token: token,
		data: data,
	};
}

//get all user
router.route("/").get((req, res) => {
	User.find()
		.sort({ _id: -1 })
		.then((user) => res.json(user))
		.catch((err) => res.status(400).json("Error:", +err));
});

////////////////đăng kí tài khoản//////////////////////////////
router.route("/signup").post((req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const fullname = req.body.fullname;
	const dob = req.body.dob;
	const email = req.body.email;
	const phone = req.body.phone;
	//hash password
	bcrypt.hash(password, 10, (err, hashPassword) => {
		if (err) {
			res.json({ error: err });
		} else {
			const newUser = new User({
				username: username.toLowerCase(),
				password: hashPassword,
				fullname,
				dob,
				email: email.toLowerCase(),
				phone,
			});
			//nếu email hoặc username đã tồn tại sẽ ko cho đăng kí
			User.findOne({ $or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }] })
				.then((data) => {
					if (data) {
						res.json(ResultModel("error", "Tên tài khoản hoặc email đã tồn tại"));
					} else {
						newUser
							.save()
							.then(() => {
								const dataUser = newUser.toObject();
								delete dataUser.password;
								return res.json(ResultModel("success", "Đăng kí thành công", dataUser));
							})
							.catch((err) => res.status(400).json({ error: err }));
					}
				})
				.catch((err) => res.status(400).json("Error", err));
		}
	});
});

///////////////đăng nhập////////////////////
router.route("/login").post((req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	//login by username or email
	User.findOne({ $or: [{ username: username.toLowerCase() }, { email: username.toLowerCase() }] })
		.then((user) => {
			if (user) {
				bcrypt.compare(password, user.password, (err, result) => {
					if (err) {
						res.json({ error: err });
					}
					if (result) {
						var dataUser = user.toObject();
						delete dataUser.password;
						const userAuthors = {
							_id: user._id,
							username: user.username,
							email: user.email,
						};
						const token = generateToken(userAuthors);
						res.json(ResultModel("success", "Đăng nhập thành công", token, dataUser));
					} else {
						res.json(ResultModel("error", "Tài khoản hoặc mật khẩu không chính xác"));
					}
				});
			} else {
				res.json(ResultModel("error", "Tài khoản hoặc mật khẩu không chính xác"));
			}
		})
		.catch((err) => res.status(400).json({ error: err }));
});

//send mail quên mật khẩu
router.route("/forget").post((req, res) => {
	const { email } = req.body;
	const subject = "Khôi phục mật khẩu";
	const success = "success";
	const message = "Mã OTP đã được gửi đến email của bạn";
	User.findOne({ email: email })
		.then((user) => {
			if (user) {
				const otp = generateOTP(String(user._id));
				const body = "Mã otp: " + otp;
				sendMail(email, subject, body)
					.then(() => res.json({ success, message, _id: user._id }))
					.catch((err) => res.status(400).json({ error: err }));
			} else {
				res.json({ success: "error", message: "Email không tồn tại trong hệ thống" });
			}
		})
		.catch((err) => res.status(400).json({ error: err }));
});

//xác thực otp
router.route("/verifyOTP").post((req, res) => {
	const { _id, otp } = req.body;
	const result = verifyOTP(otp, _id);
	if (result) {
		res.json({ success: "success", message: "Xác nhận mã OTP thành công, bạn vui lòng thay đổi lại mật khẩu" });
	} else {
		res.json({ success: "error", message: "Xác thực thất bại" });
	}
});

//đổi mật khẩu
router.route("/changePassword").post((req, res) => {
	const { _id, oldPassword, newPassword } = req.body;
	////////////////search existing user///////////////////
	User.findOne({ _id: _id })
		.then((user) => {
			if (user) {
				bcrypt.compare(oldPassword, user.password, (err, result) => {
					if (result) {
						///////////hash new pass///////////////////
						bcrypt.hash(newPassword, 10, (err, newPasswordHash) => {
							if (!err) {
								//////////////update new password to database////////////////
								User.findOneAndUpdate({ _id }, { password: newPasswordHash })
									.then(() =>
										res.json({
											success: "success",
											message: "Thay đổi mật khẩu thành công",
										})
									)
									.catch((err) => res.status(400).json({ error: err }));
							}
						});
					} else {
						////////////////wrong old password//////////////////////////
						res.json({
							success: "error",
							message: "Mật khẩu cũ không chính xác",
						});
					}
				});
			}
		})
		.catch((err) => res.status(400).json({ error: err }));
});
module.exports = router;
