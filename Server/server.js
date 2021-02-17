const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 4000;
const cors = require("cors");
app.use(cors()); //https://topdev.vn/blog/cors-la-gi/
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
require("./db");

const UserController = require("./controller/UserController");
app.use("/api/user", UserController);



app.listen(PORT, function () {
	console.log("Server is running on Port:", PORT);
});
