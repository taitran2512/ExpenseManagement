const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 4000;
const cors = require("cors");
app.use(cors()); //https://topdev.vn/blog/cors-la-gi/
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
require("./db");
//user
const UserController = require("./controller/UserController");
app.use("/api/user", UserController);
//wallet
const WalletController = require("./controller/WalletController");
app.use("/api/wallet", WalletController);
//history
const HistoryController = require("./controller/HistoryController");
app.use("/api/history", HistoryController);

app.listen(PORT, function () {
	console.log("Server is running on Port:", PORT);
});
