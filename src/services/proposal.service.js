const { Proposal } = require('../models');

/**
 * Create a proposal
 * @param {Object} proposalBody
 * @returns {Promise<Proposal>}
 */
const createProposal = (proposalBody) => {
  return Proposal.create(proposalBody);
};

module.exports = {
  createProposal,
};
