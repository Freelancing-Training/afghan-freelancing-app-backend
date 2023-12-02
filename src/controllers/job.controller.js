const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { clientService, jobService } = require('../services');
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');

const addJob = catchAsync(async (req, res) => {
  const { userId } = req.body;
  const client = await clientService.findById(userId);
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

module.exports = {
  addJob,
  getJobs,
};
