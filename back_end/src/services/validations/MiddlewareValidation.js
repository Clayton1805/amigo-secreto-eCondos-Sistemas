const { validationResult } = require('express-validator');
const { OK } = require('../../utils/allStatusCode');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(OK).json({ err: errors.array() });
  }
  next();
};
