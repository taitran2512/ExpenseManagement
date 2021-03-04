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
		trim: true,
	},
	fullname: {
		type: String,
		trim: true,
	},
	dob: {
		type: Date,
		trim: true,
	},
	email: {
		type: String,
		unique: true,
		trim: true,
	},
	phone: {
		type: String,
		trim: true,
	},
	createDate: {
		type: Date,
		default: Date.now,
	},
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
