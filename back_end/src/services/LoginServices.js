const { User } = require('../models');
const { OK } = require('../utils/allStatusCode');
const { createToken } = require('../utils/JWT');

const LoginServices = async (req, res) => {
  console.log('pelo menos entrou login')
  console.log('req.body', req.body)
  const { email, password } = req.body;
  console.log('email', email)
  const user = await User.findOne({ email, password });
  console.log('user', user)
  if (!user) return res.status(OK).json({ err: 'E-mail ou Senha invalido' });

  const { _id, name } = user;
  const token = createToken({ id: _id });

  res.status(OK).json({ name, token });
};

module.exports = LoginServices;
