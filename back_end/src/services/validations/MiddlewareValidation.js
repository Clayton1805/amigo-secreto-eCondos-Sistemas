const { validationResult } = require('express-validator');
const { BAD_REQUEST } = require('../../utils/allStatusCode');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(BAD_REQUEST).json({ err: errors.array() });
  }
  next();
};
