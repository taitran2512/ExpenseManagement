const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User.model");
function ResultModel(status, message, data = null) {
	return {
		status: status,
		message: message,
		data: data,
	};
}

//get all user
router.route("/").get((req, res) => {
	User.find()
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
						res.json(ResultModel("success", "Đăng nhập thành công", dataUser));
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
module.exports = router;
