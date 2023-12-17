const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getUserChat = {
  params: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
  }),
};

const createMessage = {
  body: Joi.object().keys({
    receiver: Joi.string().required().custom(objectId),
    message: Joi.string().required(),
  }),
};

module.exports = {
  getUserChat,
  createMessage,
};
