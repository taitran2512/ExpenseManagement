const mongoose = require("mongoose");
mongoose.connect(
	"mongodb://uxculcdj4dctyufofzhi:Ig60NJRQ2SSKicfE7GCf@bmbff87enr8qlrq-mongodb.services.clever-cloud.com:27017/bmbff87enr8qlrq",
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
