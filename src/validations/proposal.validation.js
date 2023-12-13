const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProposal = {
  body: Joi.object().keys({
    jobId: Joi.string().required().custom(objectId),
    description: Joi.string().required(),
    rate: Joi.number().required(),
  }),
};

module.exports = {
  createProposal,
};
