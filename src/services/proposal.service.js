const { Proposal } = require('../models');

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

module.exports = {
  createProposal,
  findProposalByJobId,
  findFreelancerJobProposal,
  findProposalByFreelancerId,
};
