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
 * @param {ObjectId} freelancerId
 * @returns {Promise<Offer>}
 */
const findOfferByFreelancerId = (freelancerId) => {
  return Offer.findOne({ freelancerId: freelancerId });
};

/**
 * find a offer by id
 * @param {ObjectId} offerId
 * @returns {Promise<Offer>}
 */
const findById = (offerId) => {
  return Offer.findById(offerId);
};

/**
 * Update offer
 * @param {ObjectId} offer
 * @param {Object} updateBody
 * @returns {Promise<Offer>}
 */
const updateOffer = (offer, updateBody) => {
  Object.assign(offer, updateBody);
  return offer.save();
};

module.exports = {
  findById,
  createOffer,
  updateOffer,
  findAllOffers,
  countOffers,
  findOfferByJobId,
  findFreelancerJobOffer,
  findOfferByFreelancerId,
};
