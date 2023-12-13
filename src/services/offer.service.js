const { Offer } = require('../models');

/**
 * Create a offer
 * @param {Object} offerBody
 * @returns {Promise<Offer>}
 */
const createOffer = (offerBody) => {
  return Offer.create(offerBody);
};

/**
 * get offer by job id
 * @param {ObjectId} jobId
 * @returns {Promise<Offer>}
 */
const findOfferByJobId = (jobId) => {
  return Offer.findOne({ jobId: jobId });
};

/**
 * find user job Offer
 * @param {ObjectId} jobId
 * @param {ObjectId} freelancerId
 * @returns {Promise<Offer>}
 */
const findFreelancerJobOffer = (jobId, freelancerId) => {
  return Offer.findOne({ jobId: jobId, freelancerId: freelancerId });
};

/**
 * find user all Offers
 * @param {ObjectId} freelancerId
 * @returns {Promise<Offer>}
 */
const findAllOffers = (freelancerId) => {
  return Offer.find({ freelancerId: freelancerId });
};

/**
 * find user all Offers
 * @param {ObjectId} freelancerId
 * @returns {Promise<Offer>}
 */
const countOffers = (freelancerId) => {
  return Offer.countDocuments({ freelancerId: freelancerId });
};

/**
 * get Offer by freelancer id
 * @param {Object} freelancerId
 * @returns {Promise<Offer>}
 */
const findOfferByFreelancerId = (freelancerId) => {
  return Offer.findOne({ freelancerId: freelancerId });
};

module.exports = {
  createOffer,
  findAllOffers,
  countOffers,
  findOfferByJobId,
  findFreelancerJobOffer,
  findOfferByFreelancerId,
};
