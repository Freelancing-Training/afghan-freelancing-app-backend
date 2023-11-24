const Joi = require('joi');

const title = {
  body: Joi.object()
    .keys({
      title: Joi.string(),
    })
    .min(1),
};

const experience = {
  body: Joi.object()
    .keys({
      title: Joi.string().required(),
      organization: Joi.string().required(),
      location: Joi.string().required(),
      startMonth: Joi.number().required().min(1).max(12),
      startYear: Joi.number().integer().required().min(1900).max(2100),
      currentlyWorking: Joi.boolean(),
      endMonth: Joi.number().min(1).max(12),
      endYear: Joi.number().integer().min(1900).max(2100),
      description: Joi.string().required(),
    })
    .min(1),
};

const education = {
  body: Joi.object()
    .keys({
      school: Joi.string().required(),
      degree: Joi.string().required(),
      fieldOfStudy: Joi.string().required(),
      fromDate: Joi.date().iso().required(),
      toDate: Joi.date().iso().required(),
      description: Joi.string().required(),
    })
    .min(1),
};

const languages = {
  body: Joi.array()
    .items({
      language: Joi.string().required(),
      proficiency: Joi.string().required().valid('Native', 'Fluent', 'Conversational', 'Basic'),
    })
    .min(1)
    .message('select at least one language'),
};

const addSkills = {
  body: Joi.array()
    .items({
      name: Joi.string().required(),
    })
    .min(1)
    .message('select at least one language'),
};

const addBiography = {
  body: Joi.object().keys({
    biography: Joi.string().required().min(400),
  }),
};

const addHourlyRate = {
  body: Joi.object().keys({
    rate: Joi.number().required().min(5).max(100),
  }),
};

const addLocation = {
  body: Joi.object().keys({
    province: Joi.string().required(),
    street: Joi.string().required(),
    zipCode: Joi.number().required(),
    phoneNumber: Joi.number().required(),
    dob: Joi.date().iso().required(),
  }),
};

module.exports = {
  title,
  addSkills,
  addLocation,
  languages,
  education,
  experience,
  addBiography,
  addHourlyRate,
};
