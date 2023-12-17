const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createOffer = {
  body: Joi.object().keys({
    proposalId: Joi.string().required().custom(objectId),
  }),
};

const acceptOffer = {
  params: Joi.object().keys({
    offerId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  acceptOffer,
  createOffer,
};
