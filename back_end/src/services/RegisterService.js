const { OK } = require('../utils/allStatusCode');
const { createToken } = require('../utils/JWT');
const { TemporaryUser, User } = require('../models');
const sendMail = require('../utils/nodemailer');
const { getTokenId } = require('../utils/JWT');

const RegisterTemporaryUserServices = async (req, res) => {
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
  const { authorization: tokenEmail } = req.headers;

  const id = getTokenId(tokenEmail);

  const temporaryUser = await TemporaryUser.findById(id);
  if (!temporaryUser) return res.status(OK).json({ err: 'Usuário já cadastrado' });

  const {
    name,
    email,
    password,
  } = temporaryUser;

  const user = await User.create({
    name,
    email,
    password,
  });

  await TemporaryUser.deleteOne({ _id: id });

  const { _id } = user;
  const token = createToken({ id: _id });

  res.status(OK).json({ name, token });
};

module.exports = {
  RegisterTemporaryUserServices,
  RegisterValidationEmailService,
};
