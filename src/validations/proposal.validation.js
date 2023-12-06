const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createProposal = {
  body: Joi.object().keys({
    freelancerId: Joi.string().required().custom(objectId),
    jobId: Joi.string().required().custom(objectId),
    description: Joi.string().required(),
    rate: Joi.number().required(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createProposal,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
