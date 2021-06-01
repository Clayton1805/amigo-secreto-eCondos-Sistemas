const { OK } = require('../utils/allStatusCode');
const { createToken } = require('../JWT');
const { User } = require('../models');

// const objErr = (err, status) => ({ err, status });

// const RegisterValidation = (body) => {
//   const {
//     name, email, password, role,
//   } = body;

//   switch (false) {
//     case validateEmail(email):
//     case validatePassword(password):
//     case validateName(name):
//     case role:
//       return objErr('All fields must be filled', BAD_REQUEST);
//     default: return null;
//   }
// };

// const emailIsExists = async (email) => {
//   const retorno = await users.findOne({ where: { email } });

//   if (retorno) return objErr('E-mail already in database.', BAD_REQUEST);
//   return null;
// };

const RegisterServices = async (req, res) => {
  const {
    name,
    email,
    password,
  } = req.body;

  // const error = RegisterValidation(body);
  // if (error) return res.status(error.status).json({ err: error.err });

  // const error2 = await emailIsExists(body.email);
  // if (error2) return res.status(error2.status).json({ err: error2.err });

  const user = await User.create({
    name,
    email,
    password,
  });

  const { _id } = user;
  const token = createToken({ id: _id });

  res.status(OK).json({ name, token });
};

module.exports = RegisterServices;
