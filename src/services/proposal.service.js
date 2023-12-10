const { Proposal } = require('../models');
const mongoose = require('mongoose');

/**
 * Create a proposal
 * @param {Object} proposalBody
 * @returns {Promise<Proposal>}
 */
const createProposal = (proposalBody) => {
  return Proposal.create(proposalBody);
};

/**
 * get proposal by freelancer id
 * @param {Object} freelancerId
 * @returns {Promise<Proposal>}
 */
const findProposalByFreelancerId = (freelancerId) => {
  return Proposal.findOne({ freelancerId: freelancerId });
};

/**
 * get proposal by job id
 * @param {ObjectId} jobId
 * @returns {Promise<Proposal>}
 */
const findProposalByJobId = (jobId) => {
  return Proposal.findOne({ jobId: jobId });
};

/**
 * find user job proposal
 * @param {ObjectId} jobId
 * @param {ObjectId} freelancerId
 * @returns {Promise<Proposal>}
 */
const findFreelancerJobProposal = (jobId, freelancerId) => {
  return Proposal.findOne({ jobId: jobId, freelancerId: freelancerId });
};

/**
 * find user all proposals
 * @param {ObjectId} freelancerId
 * @returns {Promise<Proposal>}
 */
const findAllProposals = (freelancerId) => {
  // return Proposal.find({ freelancerId: freelancerId });
  return Proposal.aggregate([
    {
      $match: {
        freelancerId: mongoose.Types.ObjectId(freelancerId),
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
    {
      $lookup: {
        from: 'clients',
        localField: 'job.clientId',
        foreignField: '_id',
        as: 'client',
      },
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

/**
 * find user all proposals
 * @param {ObjectId} freelancerId
 * @returns {Promise<Proposal>}
 */
const countProposals = (freelancerId) => {
  return Proposal.countDocuments({ freelancerId: freelancerId });
};

module.exports = {
  createProposal,
  findAllProposals,
  countProposals,
  findProposalByJobId,
  findFreelancerJobProposal,
  findProposalByFreelancerId,
};