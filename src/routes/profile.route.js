const express = require('express');
const validate = require('../middlewares/validate');
const { profileValidation } = require('../validations');
const { profileController } = require('../controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router.patch('/', auth(), validate(profileValidation.updateProfile), profileController.updateUser);

module.exports = router;
