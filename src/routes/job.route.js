const express = require('express');
const validate = require('../middlewares/validate');
const { jobValidation } = require('../validations');
const { jobController } = require('../controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(jobValidation.addJob), jobController.addJob)
  .get(auth(), validate(jobValidation.queryJobs), jobController.getJobs);

router.route('/me').get(auth(), validate(jobValidation.getJobs), jobController.getMyJobs);
router.route('/me/alls').get(auth(), validate(jobValidation.getAllJobs), jobController.getMyAllJobs);

router
  .route('/:jobId')
  .get(auth(), validate(jobValidation.getJob), jobController.getJob)
  .put(auth(), validate(jobValidation.acceptDelivery), jobController.acceptDelivery);
module.exports = router;
