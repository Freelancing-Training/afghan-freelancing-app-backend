const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProposal = {
  body: Joi.object().keys({
    jobId: Joi.string().required().custom(objectId),
    description: Joi.string().required(),
    rate: Joi.number().required(),
  }),
};

const getProposal = {
  params: Joi.object().keys({
    proposalId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  getProposal,
  createProposal,
};
