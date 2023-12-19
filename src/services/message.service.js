const { Message } = require('../models');
const mongoose = require('mongoose');

/**
 * Get User chats
 * @param {ObjectId} userId
 * @returns {Promise<Message>}
 */
const getChannels = (userId) => {
  return Message.aggregate([
    {
      $match: {
        $or: [{ sender: mongoose.Types.ObjectId(userId) }, { receiver: mongoose.Types.ObjectId(userId) }],
      },
    },
    {
      $project: {
        participantId: {
          $cond: {
            if: { $eq: ['$sender', mongoose.Types.ObjectId(userId)] },
            then: '$receiver',
            else: '$sender',
          },
        },
      },
    },
    {
      $group: {
        _id: '$participantId',
      },
    },
    {
      $addFields: {
        match: {
          $toObjectId: '$_id',
        },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'match',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: '$user',
    },
  ]);
};

/**
 * Get User chats
 * @param {ObjectId} senderId
 * @param {ObjectId} recieverId
 * @returns {Promise<Message>}
 */
const getUserChat = (senderId, recieverId) => {
  return Message.find({
    $or: [
      { $and: [{ sender: senderId }, { receiver: recieverId }] },
      { $and: [{ sender: recieverId }, { receiver: senderId }] },
    ],
  })
    .sort({ createdAt: 1 })
    .lean();
};

/**
 * create User chats
 * @param {Object} messageBody
 * @returns {Promise<Message>}
 */
const createMessage = (messageBody) => {
  return Message.create(messageBody);
};

module.exports = {
  createMessage,
  getChannels,
  getUserChat,
};
