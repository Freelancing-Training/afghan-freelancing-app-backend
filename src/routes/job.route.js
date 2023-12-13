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

router.route('/me').get(auth(), validate({}), jobController.getMyJobs);

router.route('/:jobId').get(auth(), validate(jobValidation.getJob), jobController.getJob);
module.exports = router;
