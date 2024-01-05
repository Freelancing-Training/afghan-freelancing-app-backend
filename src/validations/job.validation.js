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

const getJobs = {
  query: Joi.object().keys({
    status: Joi.string().required().valid('active', 'progress', 'completed', 'delivered'),
  }),
};

const acceptDelivery = {
  params: Joi.object().keys({
    jobId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    status: Joi.string().required().valid('active', 'progress', 'completed', 'delivered'),
    offerId: Joi.string().required().custom(objectId),
  }),
};

const queryJobs = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getAllJobs = {
  query: Joi.object().keys({
    status: Joi.string().valid('active', 'progress', 'completed', 'delivered'),
  }),
};

module.exports = {
  getJob,
  addJob,
  getJobs,
  getProposal,
  queryJobs,
  getAllJobs,
  acceptDelivery,
};
