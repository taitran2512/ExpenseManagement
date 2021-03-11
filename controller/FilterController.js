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

//lấy tổng số tiền theo loại theo user id
router.route("/getTotalMoneyByType/:userId").get((req, res) => {
	const userId = req.params.userId;
	verifyToken(req, res, (decoded) => {
		History.find({ userId })
			.sort({ _id: -1 })
			.then((history) => {
				let totalExpense = 0;
				let totalIncome = 0;
				for (var his of history) {
					if (his.type === "expense") {
						totalExpense += his.money;
					} else if (his.type === "income") {
						totalIncome += his.money;
					}
				}
				res.json(ResultModel("success", "Lấy thông tin thành công", { totalExpense, totalIncome }));
			})
			.catch((err) => res.status(400).json({ error: err }));
	});
});

module.exports = router;
