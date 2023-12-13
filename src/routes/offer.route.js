const express = require('express');
const validate = require('../middlewares/validate');
const { offerValidation } = require('../validations');
const { offerController } = require('../controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/').post(auth(), validate(offerValidation.createOffer), offerController.createOffer);

module.exports = router;
