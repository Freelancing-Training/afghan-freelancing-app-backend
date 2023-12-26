const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const { Freelancer } = require('../models');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const { firstName } = req.query;
  req.query.role = 'freelancer';
  const filter = pick(req.query, ['firstName', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  if (firstName) filter.firstName = new RegExp(`^${firstName}`, 'i');
  const result = await userService.queryUsers(filter, options);
  const userIds = result.results.map((result) => result._id);
  const freelancerDetails = await Freelancer.find({ userId: { $in: userIds } });
  const freelancerDetailsMap = {};
  freelancerDetails.forEach((freelancer) => {
    freelancerDetailsMap[freelancer.userId] = freelancer;
  });
  const resultsWithFreelancerDetails = result.results.map((result) => ({
    ...result,
    freelancer: freelancerDetailsMap[result._id] || null,
  }));
  const final = {
    page: result.page,
    limit: result.limit,
    totalPages: result.totalPages,
    results: resultsWithFreelancerDetails,
  };

  return res.status(httpStatus.OK).send(final);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
