const { Router } = require('express');
const rescue = require('express-rescue');
const RaffleServices = require('../services/RaffleServices');

const RaffleController = new Router();

RaffleController.get('/', rescue(RaffleServices));

module.exports = RaffleController;
