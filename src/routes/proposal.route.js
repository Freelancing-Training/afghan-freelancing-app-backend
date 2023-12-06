const express = require('express');
const validate = require('../middlewares/validate');
const { proposalValidation } = require('../validations');
const { proposalController } = require('../controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/').post(auth(), validate(proposalValidation.createProposal), proposalController.createProposal);

module.exports = router;
