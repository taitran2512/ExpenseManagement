const jwt = require("jsonwebtoken");
const { secretKey } = require("../config");
function ResultModel(status, message, data = null, error = null) {
	return {
		status: status,
		message: message,
		data: data,
		error: error,
	};
}
let generateToken = (user, tokenLife = '1d') => {
	return jwt.sign(user, secretKey, { algorithm: "HS256", expiresIn: tokenLife });
};

let verifyToken = (req, res, CallBack) => {
	const token = req.headers.authorization;
	if (token) {
		const bearerToken = token.split(" ")[1];
		jwt.verify(bearerToken, secretKey, (err, decoded) => {
			if (err) {
				res.status(500).send(ResultModel("error", "Xác thực token thất bại"));
			}
			if (decoded) {
				CallBack(decoded);
			}
		});
	} else {
		res.status(401).send(ResultModel("error", "Xác thực token thất bại"));
	}
};

module.exports = {
	generateToken,
	verifyToken,
};
