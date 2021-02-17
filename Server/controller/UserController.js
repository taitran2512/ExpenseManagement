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
	const dob = req.body.dob;
	const email = req.body.email;
	const phone = req.body.phone;
	//hash password
	bcrypt.hash(password, 10, (err, hashPassword) => {
		if (err) {
			res.json({ error: err });
		} else {
			const newUser = new User({ username, password: hashPassword, dob, email, phone });
			User.findOne({ username: username })
				.then((data) => {
					if (data) {
						res.json(ResultModel("error", "Tài khoản đã tồn tại"));
					} else {
						newUser
							.save()
							.then(() => {
								return res.json(ResultModel("success", "Đăng kí thành công", newUser));
							})
							.catch((err) => res.status(400).json("Error:", err));
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

	const newUser = new User({ username });

	User.findOne({ username: username })
		.then((user) => {
			if (user) {
				bcrypt.compare(password, user.password, (err, result) => {
					if (err) {
						res.json({ error: err });
					}
					if (result) {
						res.json(ResultModel("success", "Đăng nhập thành công", newUser));
					} else {
						res.json(ResultModel("error", "Tài khoản hoặc mật khẩu không chính xác"));
					}
				});
			} else {
				res.json(ResultModel("error", "Tài khoản hoặc mật khẩu không chính xác"));
			}
		})
		.catch((err) => res.status(400).json("Error:", err));
});
module.exports = router;
