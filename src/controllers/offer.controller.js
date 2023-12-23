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
  const result = await offerService.createOffer({
    proposalId,
    freelancerId: freelancer._id,
    clientId: client._id,
    jobId: job._id,
    rate: req.body.rate,
  });
  const jsonMessage = JSON.stringify({
    sender: user._id,
    receiver: freelanceUser._id,
    message: 'You received an offer',
  });

  const stringMessage = JSON.parse(jsonMessage);
  await messageService.createMessage(stringMessage);
  return res.status(httpStatus.CREATED).send(result);
});

const acceptOffer = catchAsync(async (req, res) => {
  const offer = await offerService.findById(req.params.offerId);
  if (!offer) throw new ApiError(httpStatus.NOT_FOUND, 'Offer not found');
  const freelancer = await freelancerService.findFreelancerByUserId(req.user.id);
  if (!freelancer) throw new ApiError(httpStatus.NOT_FOUND, 'Freelancer not found with the id');
  const result = await offerService.updateOffer(offer, { status: 'progress' });
  return res.status(httpStatus.CREATED).send(result);
});

const rejectOffer = catchAsync(async (req, res) => {
  const offer = await offerService.findById(req.params.offerId);
  if (!offer) throw new ApiError(httpStatus.NOT_FOUND, 'Offer not found');
  const freelancer = await freelancerService.findFreelancerByUserId(req.user.id);
  if (!freelancer) throw new ApiError(httpStatus.NOT_FOUND, 'Freelancer not found with the id');
  await offerService.updateOffer(offer, { status: 'canceled' });
  const result = await offerService.createOffer(req.body);
  return res.status(httpStatus.CREATED).send(result);
});

const getOffers = catchAsync(async (req, res) => {
  const { status } = req.query;
  console.log(status);
  const freelancer = await freelancerService.findFreelancerByUserId(req.user.id);
  if (!freelancer) throw new ApiError(httpStatus.NOT_FOUND, 'Freelancer Not Found');
  const offers = await offerService.findAllOffers(freelancer._id, status);
  const result = {
    title: 'Offers',
    categories: offers,
  };

  return res.status(httpStatus.OK).send(result);
});

const getOffer = catchAsync(async (req, res) => {
  const { offerId } = req.params;
  const offer = await offerService.findById(offerId);
  if (!offer) throw new ApiError(httpStatus.NOT_FOUND, 'Offer not found');
  const freelancer = await freelancerService.findFreelancerByUserId(req.user.id);
  if (!freelancer) throw new ApiError(httpStatus.NOT_FOUND, 'Freelancer Not Found');
  if (freelancer._id.toString() !== offer.freelancerId.toString()) throw new ApiError(httpStatus.FORBIDDEN, 'FORBIDDEN');
  const result = await offerService.getOffer(offerId);
  return res.status(httpStatus.OK).send(result);
});

const completeOffer = catchAsync(async (req, res) => {
  const offer = await offerService.findById(req.params.offerId);
  if (!offer) throw new ApiError(httpStatus.NOT_FOUND, 'Offer not found');
  const freelancer = await freelancerService.findFreelancerByUserId(req.user.id);
  if (!freelancer) throw new ApiError(httpStatus.NOT_FOUND, 'Freelancer not found with the id');
  const result = await offerService.updateOffer(offer, { status: 'completed' });
  return res.status(httpStatus.CREATED).send(result);
});

module.exports = {
  getOffer,
  getOffers,
  createOffer,
  acceptOffer,
  rejectOffer,
  completeOffer,
};
