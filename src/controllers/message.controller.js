const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { messageService } = require('../services');
const ApiError = require('../utils/ApiError');

const getChannels = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const results = await messageService.getChannels(userId);
  console.log(results);
  return res.status(httpStatus.OK).send(results);
});

module.exports = {
  getChannels,
};
