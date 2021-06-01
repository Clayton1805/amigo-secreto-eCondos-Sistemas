const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

module.exports = (token) => jwt.decode(token, secret);
