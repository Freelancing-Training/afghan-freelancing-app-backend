const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createOffer = {
  body: Joi.object().keys({
    jobId: Joi.string().required().custom(objectId),
    freelancerId: Joi.string().required(),
  }),
};

module.exports = {
  createOffer,
};
