const mongoose = require("mongoose");
mongoose.connect(
	"mongodb://localhost:27017/expense",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(error) => {
		if (!error) {
			console.log("Connect mongodb success");
		} else {
			console.log("Connect failed");
		}
	}
);
