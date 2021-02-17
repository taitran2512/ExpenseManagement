const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		require: true,
		unique: true,
		trim: true,
	},
	password: {
		type: String,
		require: true,
	},
	fullname: {
		type: String,
	},
	dob: {
		type: Date,
	},
	email: {
		type: String,
		unique: true,
		trim: true,
	},
	phone: {
		type: String,
	},
	createDate: {
		type: Date,
		default: Date.now,
	},
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
