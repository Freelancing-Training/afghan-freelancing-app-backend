const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const freelancerSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
    },
    experiences: [
      {
        title: {
          type: String,
          required: true,
        },
        company: {
          type: String,
          required: true,
        },
        location: {
          type: String,
          required: true,
        },
        startYear: {
          type: Number,
          required: true,
        },
        startMonth: {
          type: Number,
          required: true,
        },
        endYear: {
          type: Number,
        },
        endMonth: {
          type: Number,
        },
        currentlyWorking: {
          type: Boolean,
          default: false,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    education: [
      {
        school: {
          type: String,
          required: true,
        },
        degree: {
          type: String,
          required: true,
        },
        fieldOfStudy: {
          type: String,
          required: true,
        },
        toDate: {
          type: Date,
          required: true,
        },
        fromDate: {
          type: Date,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    languages: [
      {
        languages: String,
        proficiency: {
          type: String,
          enum: ['Native', 'Fluent', 'Conversational', 'Basic'],
        },
      },
    ],
    skills: [
      {
        name: String,
      },
    ],
    biography: String,
    rate: Number,
    imageUrl: String,
    dob: Date,
    province: String,
    street: String,
    zipCode: String,
    phoneNumber: String,
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
freelancerSchema.plugin(toJSON);
freelancerSchema.plugin(paginate);

/**
 * @typedef Freelancer
 */
const Freelancer = mongoose.model('Freelancer', freelancerSchema);

module.exports = Freelancer;
