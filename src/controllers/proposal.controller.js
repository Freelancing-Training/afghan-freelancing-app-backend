const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { clientService, jobService, freelancerService, proposalService } = require('../services');
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');

const createProposal = catchAsync(async (req, res) => {
  const { freelancerId } = req.body;
  const freelancer = await freelancerService.findById(freelancerId);
  if (!freelancer) throw new ApiError(httpStatus.NOT_FOUND, 'Freelancer not found with the id');
  const proposal = await proposalService.createProposal(req.body);
  return res.status(httpStatus.CREATED).send(proposal);
});

const getJobs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const jobs = await jobService.queryJobs(filter, options);
  return res.json(jobs);
});

module.exports = {
  createProposal,
  getJobs,
};
