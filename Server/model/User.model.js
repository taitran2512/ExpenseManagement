const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
	dob: {
		type: Date,
	},
	email: {
		type: String,
	},
	phone: {
		type: String,
	},
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
