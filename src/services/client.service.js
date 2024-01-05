const { Client } = require('../models');

/**
 * Create a Client
 * @param {Object} clientBody
 * @returns {Promise<Client>}
 */
const createClient = async (clientBody) => {
  return Client.create(clientBody);
};

/**
 * find a Client by user id
 * @param {ObjectId} userId
 * @returns {Promise<Client>}
 */
const findClientByUserId = (userId) => {
  return Client.findOne({ userId });
};

/**
 * find client id
 * @param {ObjectId} id
 * @returns {Promise<Client>}
 */
const findById = (id) => {
  return Client.findById(id);
};

/**
 * Update client by id
 * @param {Client} client
 * @param {Object} updateBody
 * @returns {Promise<Client>}
 */
const updateClient = (client, updateBody) => {
  Object.assign(client, updateBody);
  return client.save();
};

module.exports = {
  findById,
  createClient,
  updateClient,
  findClientByUserId,
};
