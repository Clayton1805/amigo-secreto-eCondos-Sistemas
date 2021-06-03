const { Router } = require('express');
const rescue = require('express-rescue');
const {
  RegisterTemporaryUserServices,
  RegisterValidationEmailService,
  RegisterResendValidationEmailService,
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

RegisterController.post('/resend_validation_email', rescue(RegisterResendValidationEmailService));

module.exports = RegisterController;
