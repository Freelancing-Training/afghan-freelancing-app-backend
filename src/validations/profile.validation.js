const Joi = require('joi');

const updateProfile = {
  body: Joi.object()
    .keys({
      title: Joi.string(),
    })
    .min(1),
};

module.exports = { updateProfile };
