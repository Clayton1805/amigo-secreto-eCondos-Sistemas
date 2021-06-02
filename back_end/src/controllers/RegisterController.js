const { Router } = require('express');
const rescue = require('express-rescue');
const {
  RegisterTemporaryUserServices,
  RegisterValidationEmailService,
} = require('../services/RegisterService');
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
  rescue(RegisterTemporaryUserServices));

RegisterController.get('/validation_email', rescue(RegisterValidationEmailService));
// RegisterValidationEmailService
module.exports = RegisterController;
