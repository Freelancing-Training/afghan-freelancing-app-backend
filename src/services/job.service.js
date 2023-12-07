const { Job } = require('../models');

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

module.exports = {
  getJobs,
  findById,
  createJob,
  queryJobs,
};
