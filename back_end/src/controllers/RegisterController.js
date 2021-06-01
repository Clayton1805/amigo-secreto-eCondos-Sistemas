const { Router } = require('express');
const rescue = require('express-rescue');
const RegisterService = require('../services/RegisterService');
const {
  MiddlewareValidation,
  validationsRegister: {
    validationsRegisterPost,
  },
} = require('../services/validations');

const RegisterController = new Router();

RegisterController.post('/',
  validationsRegisterPost,
  rescue(MiddlewareValidation),
  rescue(RegisterService));

module.exports = RegisterController;
