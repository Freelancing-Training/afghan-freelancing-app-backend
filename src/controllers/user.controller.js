const httpStatus = require('http-status');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, socketService } = require('../services');
const Socket = require('../utils/socket.io');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
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

const getIdentifier = catchAsync(async (req, res) => {
  const result = await userService.getIdentifier(req.user.id);
  return res.send(result);
});

const validateUser = catchAsync(async (req, res) => {
  const { data } = req.body;
  const userId = data.split('_')[1];

  if (!userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'invalid data');
  }

  // check if the sent data is valid
  // created by our API
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError('invalid data');
  }

  // check if user is available with the ID
  const user = await userService.getUserById(userId);
  if (!user) {
    throw new ApiError('user not found with this Id');
  }

  // get active identifier
  const activeIdentifier = await userService.getIdentifier(userId);

  console.log(activeIdentifier.identifierId !== data);
  if (activeIdentifier.identifierId !== data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid or expire data');
  }

  // check if user is not offline
  const socketId = await socketService.getSocketId(userId);
  // check data if this is last created data for user
  const allDocuments = await userService.getAllIdentifiers(userId);
  const latest = allDocuments[0];

  if (latest.identifierId !== data || !latest.active) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'provided data is expired');
  }

  // update all to be inactive
  await userService.updateAllIdentifiers(userId);

  const uniqueId = `${uuidv4()}_${user._id}_${Date.now()}`;
  await userService.createIdentifier({ userId: user._id, identifierId: uniqueId });

  await Socket.socket.to(socketId).emit('update_qr', 'fetch new id');
  return res.status(httpStatus.OK).send({ message: 'changed' });
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getIdentifier,
  validateUser,
};
