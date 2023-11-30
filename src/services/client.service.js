const httpStatus = require('http-status');
const { Client } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Client
 * @param {Object} clientBody
 * @returns {Promise<Client>}
 */
const createClient = async (clientBody) => {
  return Client.create(clientBody);
};

/**
 * Create a Client
 * @param {ObjectId} userId
 * @returns {Promise<Client>}
 */
const findClientByUserId = (userId) => {
  return Client.findOne({ userId });
};

module.exports = {
  createClient,
  findClientByUserId,
};
