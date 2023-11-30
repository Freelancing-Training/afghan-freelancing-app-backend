const { Job } = require('../models');

/**
 * Create a job
 * @param {Object} jobBody
 * @returns {Promise<Job>}
 */
const createJob = async (jobBody) => {
  return Job.create(jobBody);
};

module.exports = {
  createJob,
};
