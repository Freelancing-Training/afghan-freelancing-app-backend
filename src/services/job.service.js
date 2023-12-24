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
 * @param {String} status
 * @returns {Promise<Job>}
 */
const findAllJobs = (clientId, status) => {
  return Job.aggregate([
    {
      $match: {
        clientId: mongoose.Types.ObjectId(clientId),
      },
    },
    {
      $match: {
        status: status,
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
  ]);
};

/**
 * find only accepted offer jobs
 * @param {ObjectId} clientId
 * @param {String} status
 * @returns {Promise<Job>}
 */
const findOnlyAcceptedOffers = (clientId, status) => {
  return Job.aggregate([
    {
      $match: {
        clientId: mongoose.Types.ObjectId(clientId),
      },
    },
    {
      $match: {
        status: status,
      },
    },
    {
      $lookup: {
        from: 'offers',
        localField: '_id',
        foreignField: 'jobId',
        as: 'offer',
      },
    },
    {
      $unwind: '$offer',
    },
    {
      $match: {
        'offer.status': status,
      },
    },
    {
      $lookup: {
        from: 'proposals',
        localField: 'offer.proposalId',
        foreignField: '_id',
        as: 'proposals',
      },
    },
  ]);
};

/**
 * Update job
 * @param {Object} job
 * @param {Object} updateBody
 * @returns {Promise<Job>}
 */
const updateJob = (job, updateBody) => {
  Object.assign(job, updateBody);
  return job.save();
};

module.exports = {
  getJobs,
  findById,
  updateJob,
  createJob,
  queryJobs,
  countMyJob,
  findAllJobs,
  findOnlyAcceptedOffers,
};
