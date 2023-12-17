const express = require('express');
const validate = require('../middlewares/validate');
const { messageValidation } = require('../validations');
const { messageController } = require('../controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/').get(auth(), validate({}), messageController.getChannels);

module.exports = router;
