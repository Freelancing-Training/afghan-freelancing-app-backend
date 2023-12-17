const { Message } = require('../models');

/**
 * Get User chats
 * @param {ObjectId} userId
 * @param {ObjectId} senderId
 * @returns {Promise<Offer>}
 */
const getChannels = (userId) => {
  return Message.aggregate([
    {
      $match: {
        $or: [{ sender: userId }, { receiver: userId }],
      },
    },
    {
      $project: {
        participantId: {
          $cond: {
            if: { $eq: ['$sender', userId] },
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

module.exports = {
  getChannels,
};
