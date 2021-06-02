const { OK } = require('../utils/allStatusCode');
const { createToken } = require('../utils/JWT');
const { TemporaryUser, User } = require('../models');
const sendMail = require('../utils/nodemailer');
const { getTokenId } = require('../utils/JWT');

const RegisterTemporaryUserServices = async (req, res) => {
  console.log('pelo menos chega')
  const {
    name,
    email,
    password,
  } = req.body;

  const user = await TemporaryUser.create({
    name,
    email,
    password,
  });

  const { _id } = user;
  const token = createToken({ id: _id });

  const urlValidationEmail = `http://localhost:3000/validar_email/${token}`;

  const message = {
    from: 'Amigo_secreto@gmail.com',
    to: email,
    subject: 'Validação de E-mail amigo secreto',
    html: `<p>Oi, ${name}.</p>
    <p>somos o site de amigo secreto, clique no botão abaixo e você sera redirecionado para uma pagina que validara sua conta:</p>
    <a href="${urlValidationEmail}">
    <button type="button">Validar e-mail</button>
    </a>`,
  };

  sendMail(message);

  res.status(OK).json({ ok: 'ok' });
};

const RegisterValidationEmailService = async (req, res) => {
  // const { Authorization: token } = req.headers;
  const { authorization: tokenEmail } = req.headers;
  // console.log('ola', ola)
  // console.log('token', tokenEmail)
  const id = getTokenId(tokenEmail);
  // console.log('id', id)
  const temporaryUser = await TemporaryUser.findById(id);
  // console.log('temporaryUser', temporaryUser)
  if (!temporaryUser) return res.status(OK).json({ err: 'Usuário já cadastrado' });
  const {
    name,
    email,
    password,
  } = temporaryUser;
  console.log({
    name,
    email,
    password,
  })
  const user = await User.create({
    name,
    email,
    password,
  });
  TemporaryUser.deleteOne({ _id: id })
    .then(() => console.log('deletou'))
    .catch(() => console.log('quebrou o delete'));

  console.log('user', user)

  const { _id } = user;
  console.log('id', _id)
  const token = createToken({ id: _id });
  console.log('token', token)

  res.status(OK).json({ name, token });
};

module.exports = {
  RegisterTemporaryUserServices,
  RegisterValidationEmailService,
};
