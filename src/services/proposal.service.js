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
 * update many proposals
 * @param {ObjectId} jobId
 * @returns {Promise<Proposal>}
 */
const updateManyProposals = (jobId) => {
  return Proposal.updateMany({ jobId }, { $set: { status: 'cleared' } });
};

/**
 * get proposal by freelancer id
 * @param {ObjectId} freelancerId
 * @returns {Promise<Proposal>}
 */
const findProposalByFreelancerId = (freelancerId) => {
  return Proposal.findOne({ freelancerId: freelancerId });
};

/**
 * get proposal by freelancer id
 * @param {ObjectId} proposalId
 * @returns {Promise<Proposal>}
 */
const findById = (proposalId) => {
  return Proposal.findById(proposalId);
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
 * @param {String} status
 * @returns {Promise<Proposal>}
 */
const findAllProposals = (freelancerId, status) => {
  // return Proposal.find({ freelancerId: freelancerId });
  return Proposal.aggregate([
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
 * @param {ObjectId} jobId
 * @param {ObjectId} freelancerId
 * @returns {Promise<Proposal>}
 */
const getProposal = (proposalId) => {
  return Proposal.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(proposalId),
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
        from: 'freelancers',
        localField: 'freelancerId',
        foreignField: '_id',
        as: 'freelancer',
      },
    },
    {
      $unwind: '$freelancer',
    },
    {
      $lookup: {
        from: 'users',
        localField: 'freelancer.userId',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: '$user',
    },
    {
      $lookup: {
        from: 'offers',
        let: { proposalId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$proposalId', '$$proposalId'],
              },
            },
          },
        ],
        as: 'offer',
      },
    },
    {
      $unwind: {
        path: '$offer',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $addFields: {
        offer: {
          $ifNull: ['$offer', []],
        },
      },
    },
  ]);
};

/**
 * count user all proposals
 * @param {ObjectId} freelancerId
 * @returns {Promise<Proposal>}
 */
const countProposals = (freelancerId) => {
  return Proposal.countDocuments({ freelancerId: freelancerId });
};

module.exports = {
  findById,
  getProposal,
  createProposal,
  findAllProposals,
  countProposals,
  findProposalByJobId,
  updateManyProposals,
  findFreelancerJobProposal,
  findProposalByFreelancerId,
};
