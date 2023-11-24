const express = require('express');
const validate = require('../middlewares/validate');
const { profileValidation } = require('../validations');
const { profileController } = require('../controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/').patch(auth(), validate(profileValidation.updateProfile), profileController.updateProfile);
router.route('/experience').post(auth(), validate(profileValidation.addExperience), profileController.addExperience);

module.exports = router;
