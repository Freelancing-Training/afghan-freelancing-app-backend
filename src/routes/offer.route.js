const express = require('express');
const validate = require('../middlewares/validate');
const { offerValidation } = require('../validations');
const { offerController } = require('../controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/').post(auth(), validate(offerValidation.createOffer), offerController.createOffer);

router
  .route('/:offerId')
  .post(auth(), validate(offerValidation.acceptOffer), offerController.acceptOffer)
  .patch(auth(), validate(offerValidation.acceptOffer), offerController.rejectOffer);

module.exports = router;
