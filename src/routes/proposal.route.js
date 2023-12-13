const express = require('express');
const validate = require('../middlewares/validate');
const { proposalValidation } = require('../validations');
const { proposalController } = require('../controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(proposalValidation.createProposal), proposalController.createProposal)
  .get(auth(), validate({}), proposalController.getProfosalsAndOffers);

router.route('/:proposalId').get(auth(), validate(proposalValidation.getProposal), proposalController.getProposal);

module.exports = router;
