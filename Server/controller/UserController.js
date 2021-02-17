const express = require("express");
const router = express.Router();
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

//đăng kí tài khoản
router.route("/signup").post((req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const dob = req.body.dob;

	const newUser = new User({ username, password, dob });
	User.findOne({ username: username })
		.then((data) => {
			if (data) {
				res.json(ResultModel("error", "Tài khoản đã tồn tại"));
			} else {
				newUser
					.save()
					.then(() => res.json(ResultModel("success", "Đăng kí thành công", newUser)))
					.catch((err) => res.status(400).json("Error:", err));
			}
		})
		.catch((err) => res.status(400).json("Error", err));
});

//đăng nhập
router.route("/login").post((req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const newUser = new User({ username, password });
	User.findOne({ username: username, password: password })
		.then((data) => {
			if (data) {
				res.json(ResultModel("error", "Đăng nhập thành công", new User()));
			} else {
				res.json(ResultModel("error", "Đăng nhập thất bại"));
			}
		})
		.catch((err) => res.status(400));
});
module.exports = router;
