const { body } = require('express-validator');
const { TemporaryUser, User } = require('../../models');

const validationsRegisterPost = [
  body('email')
    .isEmail().withMessage('E-mail precisa ter um formato valido.')
    .custom((email) => TemporaryUser.find({ email })
      .then((user) => {
        if (user.length !== 0) {
          return Promise.reject('E-mail já está cadastrado, esperando validação de e-mail.');
        }
      }))
    .custom((email) => User.find({ email })
      .then((user) => {
        if (user.length !== 0) {
          return Promise.reject('E-mail já está cadastrado.');
        }
      })),
  body('name')
    .isLength({ min: 12 }).withMessage('Nome precisa ter mais de 11 letras.')
    .matches(/^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]+$/)
    .withMessage('Nome só aceita letras.'),
  body('password')
    .isLength({ min: 6 }).withMessage('Senha precisa ter mais de 5 caracteres.'),
];

module.exports = {
  validationsRegisterPost,
};
