const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
	userId: {
		type: String,
		required: true,
	},
	walletId: {
		type: String,
		required: true,
	},
	code: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	money: {
		type: Number,
		required: true,
	},
	note: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const HistoryModel = mongoose.model("histories", HistorySchema);
module.exports = HistoryModel;
