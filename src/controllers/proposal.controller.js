const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { freelancerService, proposalService, offerService } = require('../services');
const ApiError = require('../utils/ApiError');

const createProposal = catchAsync(async (req, res) => {
  const freelancer = await freelancerService.findFreelancerByUserId(req.user.id);
  if (!freelancer) throw new ApiError(httpStatus.NOT_FOUND, 'Freelancer not found with the id');
  const proposal = await proposalService.findFreelancerJobProposal(req.body.jobId, freelancer._id);
  if (proposal) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'You already have applied for this job');
  req.body.freelancerId = freelancer._id;
  const result = await proposalService.createProposal(req.body);
  return res.status(httpStatus.CREATED).send(result);
});

const getProfosalsAndOffers = catchAsync(async (req, res) => {
  const freelancer = await freelancerService.findFreelancerByUserId(req.user.id);
  if (!freelancer) throw new ApiError(httpStatus.NOT_FOUND, 'Freelancer not found with the id');
  const totalProposals = await proposalService.countProposals(freelancer._id);
  const proposals = await proposalService.findAllProposals(freelancer._id);
  const totalOffers = await offerService.countOffers(freelancer._id);
  const offers = await offerService.findAllOffers(freelancer._id);

  const result = [
    {
      title: 'Offers',
      totalCount: totalOffers,
      categories: offers,
    },
    {
      title: 'Proposals',
      totalCount: totalProposals,
      categories: proposals,
    },
  ];
  console.log({ proposals });
  return res.status(httpStatus.OK).send(result);
});

module.exports = {
  createProposal,
  getProfosalsAndOffers,
};
