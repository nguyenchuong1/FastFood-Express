const jwtVariable = require('../../variables/jwt');
const db = require("../models");
const Customer = db.customer;
const authMethod = require('./auth.method');

exports.isAuth = async (req, res, next) => {
	try {
		// Get access token from header
		const accessTokenFromHeader = req.headers.authorization.split(' ');
		if (!accessTokenFromHeader[1]) {
			return res.status(401).send({ error: 'Access token not found.' });
		}

		// Verify access token
		const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
		const verified = await authMethod.verifyToken(accessTokenFromHeader[1], accessTokenSecret);
		if (!verified) {
			return res.status(401).send({ error: 'Invalid access token.' });
		}

		// // Find customer by email
		// const customer = await findCustomerByEmail(verified.payload.email);
		// if (!customer) {
		// 	return res.status(401).send({ error: `Customer not found with email ${verified.payload.email}.` });
		// }

		res.send(verified.payload);
		next();
	} catch (error) {
		console.error(error);
		return res.status(500).send({ error: 'An error occurred while processing your request.' });
	}
};

async function findCustomerByEmail(email) {
	const customer = await Customer.findOne({ email });
	return customer;
}

exports.checkAuth = async(req) => {
	// Get access token from header
	const accessTokenFromHeader = req.headers.authorization.split(' ');
	if (!accessTokenFromHeader[1]) {
		return null;
	}

	// Verify access token
	const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
	const verified = await authMethod.verifyToken(accessTokenFromHeader[1], accessTokenSecret);
	if (!verified) {
		return null;
	}

	return verified.payload
}
