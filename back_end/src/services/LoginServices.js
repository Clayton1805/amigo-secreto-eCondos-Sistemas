const { User } = require('../models');
const { OK, BAD_REQUEST } = require('../utils/allStatusCode');
const { createToken } = require('../utils/JWT');

const LoginServices = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) return res.status(BAD_REQUEST).json({ err: 'E-mail ou Senha invalido' });

  const { _id, name } = user;
  const token = createToken({ id: _id });

  res.status(OK).json({ name, token });
};

module.exports = LoginServices;
