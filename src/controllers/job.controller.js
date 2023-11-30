const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { clientService, jobService } = require('../services');
const ApiError = require('../utils/ApiError');

const addJob = catchAsync(async (req, res) => {
  const { userId } = req.body;
  const client = await clientService.findById(userId);
  if (!client) throw new ApiError(httpStatus.NOT_FOUND, 'Client not found with the id');
  const job = await jobService.createJob(req.body);
  return res.status(httpStatus.CREATED).send(job);
});

module.exports = {
  addJob,
};
