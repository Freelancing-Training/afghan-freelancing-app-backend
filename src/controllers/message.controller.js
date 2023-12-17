const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { messageService, userService } = require('../services');
const ApiError = require('../utils/ApiError');

const getChannels = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const results = await messageService.getChannels(userId);
  return res.status(httpStatus.OK).send(results);
});

const getUserChat = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const user = await userService.getUserById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User Not found');
  const myId = req.user.id;
  const results = await messageService.getUserChat(userId, myId);
  return res.status(httpStatus.OK).send(results);
});

const createMessage = catchAsync(async (req, res) => {
  req.body.sender = req.user.id;
  const results = await messageService.createMessage(req.body);
  return res.status(httpStatus.OK).send(results);
});

module.exports = {
  createMessage,
  getChannels,
  getUserChat,
};
