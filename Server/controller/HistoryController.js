const express = require("express");
const router = express.Router();
const { verifyToken } = require("../helpers/jwt.helper");
const History = require("../model/History.model");
const Wallet = require("../model/Wallet.model");

function ResultModel(status, message, data = null) {
	return {
		status: status,
		message: message,
		data: data,
	};
}
//get all history
router.route("/").get((req, res) => {
	History.find()
		.sort({ _id: -1 })
		.then((his) => res.json(his))
		.catch((err) => res.status(400).json("Error:", +err));
});

//thêm mới chi tiêu / thu nhập
router.route("/create").post((req, res) => {
	const { userId, walletId, code, type, money, note } = req.body;
	const newHistory = new History({ userId, walletId, code, type, money, note });
	//type = expense || income
	verifyToken(req, res, (decoded) => {
		//type = expense sẽ trừ tiền trong ví
		if (type === "expense") {
			Wallet.findById(walletId)
				.then(async (wallet) => {
					const moneyAfterUpdate = wallet.walletMoney - money;
					if (moneyAfterUpdate < 0) {
						res.json(ResultModel("error", "Số tiền sử dụng không được nhiều hơn trong ví"));
					} else {
						Wallet.findByIdAndUpdate(walletId, { walletMoney: moneyAfterUpdate }, (waa) => {});
						newHistory
							.save()
							.then(() => res.json(ResultModel("success", "Thêm mới thành công", newHistory)))
							.catch((err) => res.status(400).json({ error: err }));
					}
				})
				.catch((err) => res.status(400).json({ error: err }));
		}
		//type = income sẽ cộng tiền trong ví
		else {
		}
	});
});

//lấy lịch sử xài tiền theo user id
router.route("/getHistory/:userId").get((req, res) => {
	const userId = req.params.userId;
	verifyToken(req, res, (decoded) => {
		History.find({ userId })
			.sort({ _id: -1 })
			.then((history) => {
				res.json(ResultModel("success", "Lấy thông tin lịch sử thành công", history));
			})
			.catch((err) => res.status(400).json({ error: err }));
	});
});
module.exports = router;
