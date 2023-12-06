const httpStatus = require('http-status');
const { User, Freelancer } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Freelancer
 * @param {Object} freelancerBody
 * @returns {Promise<Freelancer>}
 */
const createFreelancer = async (freelancerBody) => {
  return Freelancer.create(freelancerBody);
};

/**
 * Create a Freelancer
 * @param {ObjectId} userId
 * @returns {Promise<Freelancer>}
 */
const findFreelancerByUserId = (userId) => {
  return Freelancer.findOne({ userId });
};

/**
 * Update freelancer by id
 * @param {Freelancer} freelancer
 * @param {Object} updateBody
 * @returns {Promise<Freelancer>}
 */
const updateFreelancerById = (freelancer, updateBody) => {
  Object.assign(freelancer, updateBody);
  return freelancer.save();
};

/**
 * add experience to freelancer
 * @param {import('mongoose').ObjectId} freelancerId
 * @param {Object} experienceBody
 * @returns {Promise<Freelancer>}
 */
const addExperience = (freelancerId, experienceBody) => {
  return Freelancer.findOneAndUpdate({ _id: freelancerId }, { $push: { experiences: experienceBody } });
};

/**
 * add education to freelancer
 * @param {import('mongoose').ObjectId} freelancerId
 * @param {Object} educationBody
 * @returns {Promise<Freelancer>}
 */
const addEducation = (freelancerId, educationBody) => {
  return Freelancer.findOneAndUpdate({ _id: freelancerId }, { $push: { educations: educationBody } });
};

/**
 * add languages to freelancer
 * @param {import('mongoose').ObjectId} freelancerId
 * @param {Object} languagesBody
 * @returns {Promise<Freelancer>}
 */
const addLanguages = (freelancerId, languagesBody) => {
  return Freelancer.findOneAndUpdate({ _id: freelancerId }, { $set: { languages: languagesBody } });
};

/**
 * add skills to freelancer
 * @param {import('mongoose').ObjectId} freelancerId
 * @param {Object} skillsBody
 * @returns {Promise<Freelancer>}
 */
const addSkills = (freelancerId, skillsBody) => {
  return Freelancer.findOneAndUpdate({ _id: freelancerId }, { $set: { skills: skillsBody } });
};

/**
 * add biography to freelancer
 * @param {import('mongoose').ObjectId} freelancerId
 * @param {Object} biography
 * @returns {Promise<Freelancer>}
 */
const addBiography = (freelancerId, biography) => {
  return Freelancer.findOneAndUpdate({ _id: freelancerId }, { $set: { biography: biography } });
};

/**
 * add hourly rate to freelancer
 * @param {import('mongoose').ObjectId} freelancerId
 * @param {Object} rate
 * @returns {Promise<Freelancer>}
 */
const addHourlyRate = (freelancerId, rate) => {
  return Freelancer.findOneAndUpdate({ _id: freelancerId }, { $set: { rate: rate } });
};

/**
 * add location and other info to freelancer
 * @param {import('mongoose').ObjectId} freelancerId
 * @param {Object} locationBody
 * @returns {Promise<Freelancer>}
 */
const addLocation = (freelancerId, locationBody) => {
  return Freelancer.findOneAndUpdate({ _id: freelancerId }, { $set: { ...locationBody } });
};

/**
 * find freelancer by id
 * @param {import('mongoose').ObjectId} freelancerId
 * @returns {Promise<Freelancer>}
 */
const findById = (freelancerId) => {
  return Freelancer.findById(freelancerId);
};

module.exports = {
  findById,
  addSkills,
  addLocation,
  addLanguages,
  addEducation,
  addBiography,
  addHourlyRate,
  addExperience,
  createFreelancer,
  updateFreelancerById,
  findFreelancerByUserId,
};
