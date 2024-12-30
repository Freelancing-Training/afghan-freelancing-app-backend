const httpStatus = require('http-status');
const { SocketModel } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a new socket record
 * @param {Object} socketBody
 * @returns {Promise<SocketModel>}
 */
const createNewConnection = (socketBody) => {
  return SocketModel.create(socketBody);
};

/**
 * disconnect socket
 * @param {ObjectId} socketId
 * @returns {Promise<SocketModel>}
 */
const disconnection = async (socketId) => {
  return SocketModel.updateOne({ socketId }, { $set: { socketId: null, status: 'offline' } });
};

/**
 * find previous connection
 * @param {ObjectId} userId
 * @returns {Promise<SocketModel>}
 */
const findPreviousConnection = (userId) => {
  return SocketModel.findOne({ userId });
};

/**
 * Update previous connection
 * @param {Object} connection
 * @param {ObjectId} socketId
 * @returns {Promise<SocketModel>}
 */
const updateConnection = (connection, socketId, status) => {
  Object.assign(connection, { socketId, status });
  return connection.save();
};

/**
 * get socket id
 * @param {Object} userId
 * @returns {String}
 */
const getSocketId = async (userId) => {
  const document = await SocketModel.findOne({ userId });
  if (!document.socketId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'user may be offline');
  }
  return document.socketId;
};

module.exports = {
  getSocketId,
  disconnection,
  updateConnection,
  createNewConnection,
  findPreviousConnection,
};
