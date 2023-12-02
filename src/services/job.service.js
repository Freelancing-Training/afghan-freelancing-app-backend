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

const queryJobs = async (filter, options) => {
  return Job.paginate(filter, options);
};

module.exports = {
  getJobs,
  createJob,
  queryJobs,
};
