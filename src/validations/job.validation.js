const Joi = require('joi');
const { objectId } = require('./custom.validation');

const addJob = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    rate: Joi.number().required(),
    clientId: Joi.string().required().custom(objectId),
    keywords: Joi.array()
      .items({
        name: Joi.string().required(),
      })
      .min(1)
      .message('select at least one language'),
  }),
};

const getJob = {
  params: Joi.object().keys({
    jobId: Joi.string().required().custom(objectId),
  }),
};

const getProposal = {
  body: Joi.object().keys({
    freelancerId: Joi.string().required().custom(objectId),
    jobId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  getJob,
  addJob,
  getProposal,
};
