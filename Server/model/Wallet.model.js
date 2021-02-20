const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WalletSchema = new Schema({
	userId: {
		type: String,
		required: true,
	},
	walletName: {
		type: String,
		required: true,
	},
	walletMoney: {
		type: Number,
		required: true,
	},
});

const WalletModel = mongoose.model("wallets", WalletSchema);
module.exports = WalletModel;
