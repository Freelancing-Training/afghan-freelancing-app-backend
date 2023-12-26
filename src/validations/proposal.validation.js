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

const getProposals = {
  query: Joi.object().keys({
    status: Joi.string().required().valid('active', 'closed'),
  }),
};

module.exports = {
  getProposal,
  getProposals,
  createProposal,
};
