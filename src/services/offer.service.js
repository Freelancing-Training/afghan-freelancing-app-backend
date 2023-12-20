const { Offer } = require('../models');
const mongoose = require('mongoose');

/**
 * Create a offer
 * @param {Object} offerBody
 * @returns {Promise<Offer>}
 */
const createOffer = (offerBody) => {
  return Offer.create(offerBody);
};

/**
 * find offer by proposal id
 * @param {ObjectId} proposalId
 * @returns {Promise<Offer>}
 */
const findOfferByProposalId = (proposalId) => {
  return Offer.findOne({ proposalId });
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
 * @param {String} status
 * @returns {Promise<Offer>}
 */
const findAllOffers = (freelancerId, status) => {
  return Offer.aggregate([
    {
      $match: {
        freelancerId: mongoose.Types.ObjectId(freelancerId),
      },
    },
    {
      $match: {
        status: status,
      },
    },
    {
      $lookup: {
        from: 'jobs',
        localField: 'jobId',
        foreignField: '_id',
        as: 'job',
      },
    },
    {
      $unwind: '$job',
    },
  ]);
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

/**
 * find user Offer
 * @param {ObjectId} freelancerId
 * @returns {Promise<Offer>}
 */
const getOffer = (offerId) => {
  return Offer.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(offerId),
      },
    },
    {
      $lookup: {
        from: 'jobs',
        localField: 'jobId',
        foreignField: '_id',
        as: 'job',
      },
    },
    {
      $lookup: {
        from: 'clients',
        localField: 'clientId',
        foreignField: '_id',
        as: 'client',
      },
    },
    {
      $lookup: {
        from: 'proposals',
        localField: 'proposalId',
        foreignField: '_id',
        as: 'proposal',
      },
    },
    {
      $unwind: '$job',
    },
    {
      $unwind: '$proposal',
    },
    {
      $unwind: '$client',
    },
    {
      $lookup: {
        from: 'users',
        localField: 'client.userId',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: '$user',
    },
  ]);
};

module.exports = {
  getOffer,
  findById,
  createOffer,
  updateOffer,
  findAllOffers,
  countOffers,
  findOfferByJobId,
  findOfferByProposalId,
  findFreelancerJobOffer,
  findOfferByFreelancerId,
};
