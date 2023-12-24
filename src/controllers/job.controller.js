const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { clientService, jobService, freelancerService, proposalService, userService, offerService } = require('../services');
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');

const addJob = catchAsync(async (req, res) => {
  const { clientId } = req.body;
  const client = await clientService.findById(clientId);
  if (!client) throw new ApiError(httpStatus.NOT_FOUND, 'Client not found with the id');
  const job = await jobService.createJob(req.body);
  return res.status(httpStatus.CREATED).send(job);
});

const getJobs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const jobs = await jobService.queryJobs(filter, options);
  return res.json(jobs);
});

const getJob = catchAsync(async (req, res) => {
  const { jobId } = req.params;
  const freelancer = await freelancerService.findFreelancerByUserId(req.user._id);
  if (!freelancer) throw new ApiError(httpStatus.NOT_FOUND, 'Freelancer Not Found');
  const job = await jobService.findById(jobId);
  if (!job) throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  const jobProposal = await proposalService.findFreelancerJobProposal(job._id, freelancer._id);
  const client = await clientService.findById(job.clientId);
  const user = await userService.getUserById(client.userId);
  const newClient = {
    imageUrl: client.imageUrl,
    firstName: user.firstName,
    lastName: user.lastName,
    location: client.province,
    createdAt: user.createdAt,
  };
  return res.status(httpStatus.OK).send({ job, client: newClient, applied: !!jobProposal });
});

const getMyJobs = catchAsync(async (req, res) => {
  const { status } = req.query;
  const client = await clientService.findClientByUserId(req.user.id);
  if (!client) throw new ApiError(httpStatus.NOT_FOUND, 'Client not found with the id');
  const jobs = await jobService.findAllJobs(client._id, status);
  return res.status(httpStatus.OK).send(jobs);
});

const acceptDelivery = catchAsync(async (req, res) => {
  const { jobId } = req.params;
  const job = await jobService.findById(jobId);
  if (!job) throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  const { status, offerId } = req.body;
  const offer = await offerService.findById(offerId);
  if (!offer) throw new ApiError(httpStatus.NOT_FOUND, 'Offer not found');
  const client = await clientService.findClientByUserId(req.user.id);
  if (!client) throw new ApiError(httpStatus.NOT_FOUND, 'Client not found with the id');
  if (job.clientId.toString() !== client._id.toString())
    throw new ApiError(httpStatus.FORBIDDEN, 'You Can not update the job');

  await jobService.updateJob(job, { status });
  await offerService.updateOffer(offer, { status });
  await proposalService.updateManyProposals(jobId);
  return res.status(httpStatus.OK).send({});
});

module.exports = {
  addJob,
  getJob,
  getJobs,
  acceptDelivery,
  getMyJobs,
};
