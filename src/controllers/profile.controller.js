const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const updateUser = catchAsync(async (req, res) => {
  console.log(req.user);
  const user = await userService.updateUserById(req.user._id, req.body);
  res.send(user);
});

module.exports = {
  updateUser,
};
