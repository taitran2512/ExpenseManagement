const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Wallet = require("../model/Wallet.model");

function ResultModel(status, message, data = null) {
	return {
		status: status,
		message: message,
		data: data,
	};
}
//get all wallet
router.route("/").get((req, res) => {
	Wallet.find()
		.then((wallet) => res.json(wallet))
		.catch((err) => res.status(400).json("Error:", +err));
});

//tạo mới ví tiền
router.route("/create").post((req, res) => {
	const userId = req.body.userId;
	const walletName = req.body.walletName;
	const walletMoney = req.body.walletMoney;
	const newWallet = new Wallet({ userId, walletName, walletMoney });
	newWallet
		.save()
		.then(() => res.json(ResultModel("success", "Tạo mới ví tiền thành công", newWallet)))
		.catch((err) => res.status(400).json({ error: err }));
});

//lấy ví tiền theo user id
router.route("/getWallet/:userId").get((req, res) => {
	const userId = req.params.userId;
	Wallet.find({ userId })
		.then((wallet) => res.json(ResultModel("success", "Lấy ví tiền thành công", wallet)))
		.catch((err) => res.status(400).json({ error: err }));
});

//update thông tin ví tiền
router.route("/updateWallet").post((req, res) => {
	const { _id, walletName, walletMoney } = req.body;
	Wallet.findOneAndUpdate(
		{ _id },
		{ walletName, walletMoney },
		{
			new: true, // return updated doc
			runValidators: true, // validate before update
		}
	)
		.then((wallet) => res.json(ResultModel("success", "Cập nhật ví tiền thành công", wallet)))
		.catch((err) => res.status(400).json({ error: err }));
});

//xóa ví tiền
router.route("/deleteWallet/:_id").get((req, res) => {
	const _id = req.params._id;
	Wallet.findOneAndRemove({ _id })
		.then((wallet) => res.json(ResultModel("success", "Xóa ví tiền thành công", wallet)))
		.catch((err) => res.status(400).json({ error: err }));
});

module.exports = router;
