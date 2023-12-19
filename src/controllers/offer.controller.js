const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {
  freelancerService,
  offerService,
  clientService,
  jobService,
  proposalService,
  userService,
  messageService,
} = require('../services');
const ApiError = require('../utils/ApiError');

const createOffer = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.id);
  const client = await clientService.findClientByUserId(req.user.id);
  if (!client) throw new ApiError(httpStatus.NOT_FOUND, 'Client Not Found');
  const { proposalId } = req.body;
  const proposal = await proposalService.findById(proposalId);
  if (!proposal) throw new ApiError(httpStatus.NOT_FOUND, 'Proposal Not Found');
  const freelancer = await freelancerService.findById(proposal.freelancerId);
  if (!freelancer) throw new ApiError(httpStatus.NOT_FOUND, 'Freelancer Not Found');
  const freelanceUser = await userService.getUserById(freelancer.userId);
  const job = await jobService.findById(proposal.jobId);
  if (!job) throw new ApiError(httpStatus.NOT_FOUND, 'This is Job is deleted');
  if (job.clientId.toString() !== client._id.toString())
    throw new ApiError(httpStatus.FORBIDDEN, 'You Can not send offer for this job');
  const offer = await offerService.findOfferByProposalId(proposalId);
  if (offer) throw new ApiError(httpStatus.BAD_REQUEST, 'Offer Already has been sent');
  const result = await offerService.createOffer({ proposalId });
  const jsonMessage = JSON.stringify({
    sender: user._id,
    receiver: freelanceUser._id,
    message: 'You received an offer',
  });

  const stringMessage = JSON.parse(jsonMessage);
  console.log(stringMessage);
  await messageService.createMessage(stringMessage);
  return res.status(httpStatus.CREATED).send(result);
});

const acceptOffer = catchAsync(async (req, res) => {
  const offer = await offerService.findById(req.params.offerId);
  if (!offer) throw new ApiError(httpStatus.NOT_FOUND, 'Offer not found');
  const freelancer = await freelancerService.findFreelancerByUserId(req.user.id);
  if (!freelancer) throw new ApiError(httpStatus.NOT_FOUND, 'Freelancer not found with the id');
  await offerService.updateOffer(offer, { status: 'accepted' });
  const result = await offerService.createOffer(req.body);
  return res.status(httpStatus.CREATED).send(result);
});

const rejectOffer = catchAsync(async (req, res) => {
  const offer = await offerService.findById(req.params.offerId);
  if (!offer) throw new ApiError(httpStatus.NOT_FOUND, 'Offer not found');
  const freelancer = await freelancerService.findFreelancerByUserId(req.user.id);
  if (!freelancer) throw new ApiError(httpStatus.NOT_FOUND, 'Freelancer not found with the id');
  await offerService.updateOffer(offer, { status: 'rejected' });
  const result = await offerService.createOffer(req.body);
  return res.status(httpStatus.CREATED).send(result);
});

module.exports = {
  createOffer,
  acceptOffer,
  rejectOffer,
};
