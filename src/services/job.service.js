const { Job } = require('../models');
const mongoose = require('mongoose');

/**
 * Create a job
 * @param {Object} jobBody
 * @returns {Promise<Job>}
 */
const createJob = (jobBody) => {
  return Job.create(jobBody);
};

/**
 * get a job
 * @returns {Promise<Job>}
 */
const getJobs = () => {
  return Job.paginate();
};

/**
 * query on jobs
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<Job>}
 */
const queryJobs = (filter, options) => {
  return Job.paginate(filter, options);
};

/**
 * find job by id
 * @param {ObjectId} jobId
 * @returns {Promise<Job>}
 */
const findById = (jobId) => {
  return Job.findById(jobId);
};

/**
 * count user all jobs
 * @param {ObjectId} clientId
 * @returns {Promise<Job>}
 */
const countMyJob = (clientId) => {
  return Job.countDocuments({ clientId: clientId });
};

/**
 * find user all Jobs
 * @param {ObjectId} clientId
 * @returns {Promise<Job>}
 */
const findAllJobs = (clientId) => {
  return Job.aggregate([
    {
      $match: {
        clientId: mongoose.Types.ObjectId(clientId),
      },
    },
    {
      $lookup: {
        from: 'proposals',
        localField: '_id',
        foreignField: 'jobId',
        as: 'proposals',
      },
    },
    {
      $unwind: {
        path: '$proposals',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'freelancers',
        localField: 'proposals.freelancerId',
        foreignField: '_id',
        as: 'proposals.freelancer',
      },
    },
    {
      $addFields: {
        'proposals.photo': '$proposals.freelancer.photo',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'proposals.freelancer.userId',
        foreignField: '_id',
        as: 'proposals.freelancer.user',
      },
    },
    {
      $addFields: {
        'proposals.freelancer.user': {
          $arrayElemAt: ['$proposals.freelancer.user', 0],
        },
      },
    },
    {
      $project: {
        title: 1,
        createdAt: 1,
        proposals: 1,
      },
    },
    {
      $group: {
        _id: '$_id',
        title: { $first: '$title' },
        createdAt: { $first: '$createdAt' },
        proposals: { $push: '$proposals' }, // This includes all proposals, even if there are zero or one
      },
    },
  ]);
};

module.exports = {
  getJobs,
  findById,
  createJob,
  queryJobs,
  countMyJob,
  findAllJobs,
};
