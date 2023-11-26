const express = require('express');
const validate = require('../middlewares/validate');
const { profileValidation } = require('../validations');
const { profileController } = require('../controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

module.exports = router;
