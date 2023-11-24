const express = require('express');
const validate = require('../middlewares/validate');
const { profileValidation } = require('../validations');
const { profileController } = require('../controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router.patch('/', auth(), validate(profileValidation.title), profileController.updateProfile);
router.route('/experience').post(auth(), validate(profileValidation.experience), profileController.addExperience);
router.route('/education').post(auth(), validate(profileValidation.education), profileController.addEducation);
router.route('/languages').post(auth(), validate(profileValidation.languages), profileController.addLanguages);
router.route('/skills').post(auth(), validate(profileValidation.addSkills), profileController.addSkills);
router.route('/bio').post(auth(), validate(profileValidation.addBiography), profileController.addBiography);
router.route('/rate').post(auth(), validate(profileValidation.addHourlyRate), profileController.addHourlyRate);
router.route('/location').post(auth(), validate(profileValidation.addLocation), profileController.addLocation);

module.exports = router;
