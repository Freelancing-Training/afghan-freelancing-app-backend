const express = require('express');
const validate = require('../middlewares/validate');
const { messageValidation } = require('../validations');
const { messageController } = require('../controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(auth(), validate({}), messageController.getChannels)
  .post(auth(), validate(messageValidation.createMessage), messageController.createMessage);

router.route('/:userId').get(auth(), validate(messageValidation.getUserChat), messageController.getUserChat);

module.exports = router;
