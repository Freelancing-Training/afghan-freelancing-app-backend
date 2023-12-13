const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { freelancerService, offerService, clientService, jobService } = require('../services');
const ApiError = require('../utils/ApiError');

const createOffer = catchAsync(async (req, res) => {
  const client = await clientService.findClientByUserId(req.user.id);
  if (!client) throw new ApiError(httpStatus.NOT_FOUND, 'Client Not Found');
  const { jobId, freelancerId } = req.body;
  const job = await jobService.findById(jobId);
  if (!job) throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  const freelancer = await freelancerService.findById(freelancerId);
  if (!freelancer) throw new ApiError(httpStatus.NOT_FOUND, 'Freelancer not found with the id');
  const result = await offerService.createOffer(req.body);
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
