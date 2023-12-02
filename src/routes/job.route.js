const express = require('express');
const validate = require('../middlewares/validate');
const { jobValidation } = require('../validations');
const { jobController } = require('../controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(jobValidation.addJob), jobController.addJob)
  .get(auth(), validate({}), jobController.getJobs);
module.exports = router;
